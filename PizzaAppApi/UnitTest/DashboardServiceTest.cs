using Domain.Entities;
using Domain.Repository_Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Moq;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest
{
    public class DashboardServiceTest
    {
        #region Get Service Instance
        public DashboardService GetServiceInstance(Mock<IHostEnvironment> hostEnv, Mock<IFileRepository> fileRepository,
               Mock<IConfiguration> config)
        {
            return new DashboardService(hostEnv.Object, fileRepository.Object, config.Object);
        }
        #endregion


        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("     ")]
        public async Task GetDashboardDetails_Should_Throw_Exception_When_InValid_ConfigName(string configName)
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = "Configname can not be null or Empty";
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.GetDashboardDetails(configName));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("2343432")]
        [InlineData("YG^T^&")]
        public async Task GetDashboardDetails_Should_Throw_Exception_When_File_NotFound(string configName)
        {
            //Arrange
            string folderPath = @"FileStorage\Dashboard";
            string rootPath = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\";
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            hostEnv.Setup(x => x.ContentRootPath).Returns(rootPath);
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = $"Dashbord config file not found";
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.GetDashboardDetails(configName));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("dashbord")]
        [InlineData("slider")]
        public async Task GetDashboardDetails_Should_Throw_Exception_When_Dashboard_Data_NotFound(string configName)
        {
            //Arrange
            string folderPath = @"FileStorage\Dashboard";
            string rootPath = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\";
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var fileExists = true;
            hostEnv.Setup(x => x.ContentRootPath).Returns(rootPath);
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileExists);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = "Dashbord data not found";
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.GetDashboardDetails(configName));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("dashbord")]
        [InlineData("slider")]
        public async Task GetDashboardDetails_Should_ReturnData(string configName)
        {
            //Arrange
            string folderPath = @"FileStorage\Dashboard";
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var fileExists = true;
            var actalResult = GetItems();
            hostEnv.Setup(x => x.ContentRootPath).Returns(folderPath);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileExists);
            fileRepository.Setup(x => x.ReadFromFile<IEnumerable<Item>>(It.IsAny<string>())).Returns(actalResult);
            var service = GetServiceInstance(hostEnv, fileRepository, config);

            //Act
            var response = await service.GetDashboardDetails(configName);

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Data.Count(), actalResult.Count(x => x.IsActive));
        }

        private IEnumerable<Item> GetItems()
        {
            return new List<Item>
            {
                new Item
                {
                    Id = 1,
                    IsActive = true,
                    Name ="Tetsing",
                    Prize = 50,
                    PrizeUnit = "Ruppes",
                    Quantity = 1
                },
                new Item
                {
                    Id = 2,
                    IsActive = true,
                    Name ="Tetsing2",
                    Prize = 60,
                    PrizeUnit = "Ruppes",
                    Quantity = 1
                },
                new Item
                {
                    Id = 3,
                    IsActive = false,
                    Name ="Tetsing3",
                    Prize = 70,
                    PrizeUnit = "Ruppes",
                    Quantity = 1
                }
            };
        }
    }
}
