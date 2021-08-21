using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service_Interfaces
{
    public interface ILookupService
    {
        Task<List<LookupItem>> GetConfigurationsDetails(string configName);
    }
}
