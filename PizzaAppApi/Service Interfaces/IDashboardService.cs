using Domain.Entities;
using Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service_Interfaces
{
    public interface IDashboardService
    {
        Task<IPagedResponseDTO<Item>> GetDashboardDetails(string configName = "dashboard", int PageSize = 10, int PageNumber = 1);
    }
}
