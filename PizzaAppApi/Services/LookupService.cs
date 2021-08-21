using Domain.Entities;
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
    public class LookupService : ILookupService
    {
        private readonly IConfiguration _config;
        private readonly IHostEnvironment _environment;
        private readonly IFileRepository _fileRepository;      

        public LookupService(IHostEnvironment environment, IFileRepository fileRepository, IConfiguration config)
        {
            _config = config;
            _environment = environment;
            _fileRepository = fileRepository;
        }

        public async Task<List<LookupItem>> GetConfigurationsDetails(string configName)
        {
            List<LookupItem> lookupItems = null;
            if (string.IsNullOrWhiteSpace(configName))
                throw new ArgumentException("Configname can not be null or Empty");

            var folderPath = _config.GetSection("Storage:Configurations").Value;
            var filePath = Path.Combine(_environment.ContentRootPath, folderPath, configName + ".json");
            if (!_fileRepository.FileExists(filePath))
                throw new ArgumentException($"{configName} config file not found");

            var items = _fileRepository.ReadFromFile<List<LookupItem>>(filePath);

            if (items.IsNullOrEmpty())
                throw new ArgumentException("Dashbord data not found");

            lookupItems = items.Where(x => x.IsActive).ToList();
            return await Task.FromResult(lookupItems);
        }
    }
}
