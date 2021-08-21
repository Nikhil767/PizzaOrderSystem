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
    public class LookupServiceTest
    {

        #region Get Service Instance
        public LookupService GetServiceInstance(Mock<IHostEnvironment> hostEnv, Mock<IFileRepository> fileRepository,
               Mock<IConfiguration> config)
        {
            return new LookupService(hostEnv.Object, fileRepository.Object, config.Object);
        }
        #endregion

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("     ")]
        public async Task GetConfigurationsDetails_Should_Throw_Exception_When_InValid_ConfigName(string configName)
        {
            //Arrange
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = "Configname can not be null or Empty";
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(()=> service.GetConfigurationsDetails(configName));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("2343432")]
        [InlineData("YG^T^&")]
        public async Task GetConfigurationsDetails_Should_Throw_Exception_When_File_NotFound(string configName)
        {
            //Arrange
            string folderPath = @"FileStorage\Configurations";
            string rootPath = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\";
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            hostEnv.Setup(x => x.ContentRootPath).Returns(rootPath);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            var actalResult = $"{configName} config file not found";
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.GetConfigurationsDetails(configName));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("dashbord")]
        [InlineData("slider")]
        public async Task GetConfigurationsDetails_Should_Throw_Exception_When_Dashboard_Data_NotFound(string configName)
        {
            //Arrange
            string folderPath = @"FileStorage\Configurations";
            string rootPath = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\";
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var fileExists = true;
            hostEnv.Setup(x => x.ContentRootPath).Returns(rootPath);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileExists);
            var service = GetServiceInstance(hostEnv, fileRepository,config);
            var actalResult = "Dashbord data not found";
            //Act
            var response = await Assert.ThrowsAsync<ArgumentException>(() => service.GetConfigurationsDetails(configName));

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Message, actalResult);
        }

        [Theory]
        [InlineData("dashbord")]
        [InlineData("slider")]
        public async Task GetConfigurationsDetails_Should_ReturnData(string configName)
        {
            //Arrange
            string folderPath = @"FileStorage\Configurations";
            string rootPath = @"C:\Users\Dell\source\repos\AngularDemo\AngularDemo\";
            var hostEnv = new Mock<IHostEnvironment>();
            var fileRepository = new Mock<IFileRepository>();
            var config = new Mock<IConfiguration>();
            config.Setup(x => x.GetSection(It.IsAny<string>()).Value).Returns(folderPath);
            var fileExists = true;
            var actalResult = GetLookupItems();
            hostEnv.Setup(x => x.ContentRootPath).Returns(folderPath);
            fileRepository.Setup(x => x.FileExists(It.IsAny<string>())).Returns(fileExists);
            fileRepository.Setup(x => x.ReadFromFile<List<LookupItem>>(It.IsAny<string>())).Returns(actalResult);
            var service = GetServiceInstance(hostEnv, fileRepository, config);
            
            //Act
            var response = await service.GetConfigurationsDetails(configName);

            //Assert
            Assert.NotNull(response);
            Assert.Equal(response.Count, actalResult.Count(x=> x.IsActive));
        }

        private List<LookupItem> GetLookupItems()
        {
            return new List<LookupItem>
            {
                new LookupItem
                {
                    Id = 1,
                    IsActive = true,
                    Name ="Tetsing",
                    Prize = 50,
                    PrizeUnit = "Ruppes",
                    Quantity = 1
                },
                new LookupItem
                {
                    Id = 2,
                    IsActive = true,
                    Name ="Tetsing2",
                    Prize = 60,
                    PrizeUnit = "Ruppes",
                    Quantity = 1
                },
                new LookupItem
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
