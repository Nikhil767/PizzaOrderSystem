using Domain.DTO;
using Domain.Entities;
using Domain.Repository_Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Service_Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    public class OrderService : IOrderService
    {
        private readonly IConfiguration _config;
        private readonly IHostEnvironment _environment;
        private readonly IFileRepository _fileRepository;
        private static readonly object _object = new object();

        public OrderService(IHostEnvironment environment, IFileRepository fileRepository, IConfiguration config)
        {
            _config = config;
            _environment = environment;
            _fileRepository = fileRepository;
        }

        #region Public methods
        public async Task<bool> PlaceUserOrder(OrderDTO orderDetailsDTO)
        {
            bool isOrderPlaced = false;
            ValidateOrderDTO(orderDetailsDTO);

            Monitor.Enter(_object);
            try
            {
                isOrderPlaced = SaveOrderToJsonFile(orderDetailsDTO);
            }
            finally
            {
                Monitor.Exit(_object);
            }
            return await Task.FromResult(isOrderPlaced);
        }
        #endregion

        #region private Methods
        private bool SaveOrderToJsonFile(OrderDTO orderDetailsDTO)
        {
            var fileName = GetPlainTextFromEmailId(orderDetailsDTO.Email) + ".json";
            var folderPath = _config.GetSection("Storage:UserOrder").Value;
            var filePath = _fileRepository.PathCombine(_environment.ContentRootPath, folderPath, fileName);
            if (_fileRepository.FileExists(filePath))
            {
                List<Order> allOrders = _fileRepository.ReadFromFile<List<Order>>(filePath);
                allOrders.Add(orderDetailsDTO.Order);
                return _fileRepository.WriteToFile<List<Order>>(filePath, allOrders);
            }
            else
            {
                return _fileRepository.WriteToFile<List<Order>>(filePath, new List<Order> { orderDetailsDTO.Order });
            }
        }

        /// <summary>
        /// For Genearting file based on User Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private string GetPlainTextFromEmailId(string email)
        {
            return email.Replace("@","at").Replace(".", "dot").Replace("+","pl").Replace("-", "mi").Replace("~", "ti");
        }

        /// <summary>
        /// Validate Orders input DTO
        /// </summary>
        /// <param name="orderDetailsDTO"></param>
        private void ValidateOrderDTO(OrderDTO orderDetailsDTO)
        {
            if (orderDetailsDTO is null)
                throw new ArgumentException("OrderDTO is null");

            if (string.IsNullOrWhiteSpace(orderDetailsDTO.Email))
                throw new ArgumentException("Email is required for order");

            if (orderDetailsDTO.Order is null)
                throw new ArgumentException("Order is null");

            var isValidEmailId = new EmailAddressAttribute().IsValid(orderDetailsDTO.Email);
            if (!isValidEmailId)
                throw new ArgumentException("Invalid Email Id");
        }

        ///// <summary>
        ///// For Reading file for user History
        ///// </summary>
        ///// <param name="email"></param>
        ///// <returns></returns>
        //private string GetEmailIdFromPlainText(string email)
        //{
        //    return email.Replace("at", "@").Replace("dot", ".").Replace("pl", "+").Replace("mi", "-").Replace("ti", "~");
        //}
        #endregion
    }
}
