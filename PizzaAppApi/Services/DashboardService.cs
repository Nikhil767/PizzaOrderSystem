using Domain.Entities;
using Domain.Interfaces;
using Domain.Repository_Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Service_Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IConfiguration _config;
        private readonly IHostEnvironment _environment;
        private readonly IFileRepository _fileRepository;

        public DashboardService(IHostEnvironment environment, IFileRepository fileRepository, IConfiguration config)
        {
            _config = config;
            _environment = environment;
            _fileRepository = fileRepository;
        }
        public async Task<IPagedResponseDTO<Item>> GetDashboardDetails(string configName = "dashboard", int pageSize = 10, int pageNumber = 1)
        {
            List<Item> dashboardsItems = null;
            ValidateRequest(configName, pageSize, pageNumber);

            var folderPath = _config.GetSection("Storage:Dashboard").Value;
            var filePath = Path.Combine(_environment.ContentRootPath, folderPath, configName + ".json");
            if (!_fileRepository.FileExists(filePath))
                throw new ArgumentException("Dashbord config file not found");

            var items = _fileRepository.ReadFromFile<IEnumerable<Item>>(filePath);

            if (items.IsNullOrEmpty())
                throw new ArgumentException("Dashbord data not found");

            dashboardsItems = items.Where(x => x.IsActive).ToList();
            var pagedData = dashboardsItems.PagedData(pageSize, pageNumber);
            return await Task.FromResult(pagedData);
        }

        private static void ValidateRequest(string configName, int pageSize, int pageNumber)
        {
            if (pageSize <= 0)
                throw new ArgumentException("pageSize should be greater than 0");

            if (pageNumber <= 0)
                throw new ArgumentException("pageNumber should be greater than 0");

            if (string.IsNullOrWhiteSpace(configName))
                throw new ArgumentException("Configname can not be null or Empty");
        }
    }
}
