using Domain.DTO;
using Domain.Entities;
using Domain.Repository_Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Moq;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest
{
    public class OrderServiceTest
    {
        #region Get Service Instance
        public OrderService GetServiceInstance(Mock<IHostEnvironment> hostEnv, Mock<IFileRepository> fileRepository,
               Mock<IConfiguration> config)
        {
            return new OrderService(hostEnv.Object, fileRepository.Object, config.Object);
        }
        #endregion


        [Fact]
        public async Task PlaceUserOrder_Should_Throw_Exception_When_InValid_Null_OrderDTO()
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var service = GetServiceInstance(hostEnv, fileRepository,config);
            var actalResult = "OrderDTO is null";
            OrderDTO orderDetailsDTO = null;
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.PlaceUserOrder(orderDetailsDTO));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Fact]
        public async Task PlaceUserOrder_Should_Throw_Exception_When_Null_EmailId()
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = "Email is required for order";
            OrderDTO orderDetailsDTO = new OrderDTO { };
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.PlaceUserOrder(orderDetailsDTO));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Fact]
        public async Task PlaceUserOrder_Should_Throw_Exception_When_Null_Order()
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = "Order is null";
            OrderDTO orderDetailsDTO = new OrderDTO { Email = "Test@gmail.com" };
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.PlaceUserOrder(orderDetailsDTO));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("Testgmail.com")]
        [InlineData("Testgmailcom")]
        public async Task PlaceUserOrder_Should_Throw_Exception_When_Invalid_Email(string email)
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = "Invalid Email Id";
            OrderDTO orderDetailsDTO = new OrderDTO { Email = email, Order = new Order { } };
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.PlaceUserOrder(orderDetailsDTO));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Fact]
        public async Task PlaceUserOrder_Should_Save_Data_To_New_File()
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var folderPath = @"FileStorage\UserOrders";
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var path = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\dashbord.json";
            var fileEixsts = false;
            var isWriteToFile = true;
            fileRepository.Setup(x => x.PathCombine(It.IsAny<string>())).Returns(path);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileEixsts);
            fileRepository.Setup(x => x.WriteToFile<List<Order>>(It.IsAny<string>(), It.IsAny<List<Order>>())).Returns(isWriteToFile);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            OrderDTO orderDetailsDTO = new OrderDTO { Email = "Test@gmail.com", Order = new Order { } };
            //Act
            var response = await service.PlaceUserOrder(orderDetailsDTO);

            //Assert
            Assert.True(response);
        }

        [Fact]
        public async Task PlaceUserOrder_Should_Save_Data_To_Existing_File()
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var folderPath = @"FileStorage\UserOrders";
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var path = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\dashbord.json";
            var fileEixsts = true;
            var isWriteToFile = true;
            var actalResult = GetExistingOrder();
            fileRepository.Setup(x => x.PathCombine(It.IsAny<string>())).Returns(path);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileEixsts);
            fileRepository.Setup(x => x.ReadFromFile<List<Order>>(It.IsAny<string>())).Returns(actalResult);
            fileRepository.Setup(x => x.WriteToFile<List<Order>>(It.IsAny<string>(), It.IsAny<List<Order>>())).Returns(isWriteToFile);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            OrderDTO orderDetailsDTO = new OrderDTO { Email = "Test@gmail.com", Order = new Order { } };
            //Act
            var response = await service.PlaceUserOrder(orderDetailsDTO);

            //Assert
            Assert.True(response);
        }

        [Fact]
        public async Task PlaceUserOrder_Should_Save_Data_With_2_Request()
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var folderPath = @"FileStorage\UserOrders";
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var path = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\dashbord.json";
            var fileEixsts = true;
            var isWriteToFile = true;
            var actalResult = GetExistingOrder();
            fileRepository.Setup(x => x.PathCombine(It.IsAny<string>())).Returns(path);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileEixsts);
            fileRepository.Setup(x => x.ReadFromFile<List<Order>>(It.IsAny<string>())).Returns(actalResult);
            fileRepository.Setup(x => x.WriteToFile<List<Order>>(It.IsAny<string>(), It.IsAny<List<Order>>())).Returns(isWriteToFile);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            OrderDTO orderDetailsDTO = new OrderDTO { Email = "Test@gmail.com", Order = new Order { } };
            //Act
            var firstRequest = Task.Run(() => service.PlaceUserOrder(orderDetailsDTO));
            var secondRequest = Task.Run(() => service.PlaceUserOrder(orderDetailsDTO));
            var response = await Task.WhenAll(firstRequest, secondRequest);

            //Assert
            Assert.NotNull(response);
            Assert.True(response.All(x=> x == true));
        }

        private List<Order> GetExistingOrder()
        {
            return new List<Order>
            {
                new Order
                {
                    OrderID = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 8),
                    TotalPrize = 50,
                    PrizeUnit = "Ruppes",
                    OrderItems = new Item[]
                    {
                        new Item
                        {
                            Id = 1,
                            IsActive = true,
                            Name ="Coke",
                            Prize = 50,
                            PrizeUnit = "Ruppes",
                            Quantity = 1,
                            IsDrink = true,
                            IsCustomPizza = false,
                        }
                    }
                },
                new Order
                {
                    OrderID = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 8),
                    TotalPrize = 300,
                    PrizeUnit = "Ruppes",
                    OrderItems = new Item[]
                    {
                        new Item
                        {
                            Id = 1,
                            IsActive = true,
                            Name ="Medium",
                            Prize = 300,
                            PrizeUnit = "Ruppes",
                            Quantity = 1,
                            IsPizza = true,
                            IsDrink = false,
                        }                        
                    }
                }
            };
        }
    }
}
