using Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Service_Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : DefaultControllerBase
    {
        private readonly IDashboardService _dashboardService;
        protected readonly ILogger<DashboardController> logger;

        public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger) : base(logger)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet, Route("{configName?}/{PageSize?}/{PageNumber?}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetDashboardDetails([FromRoute] string configName = "dashboard", [FromRoute] int PageSize = 10, [FromRoute] int PageNumber = 1)
        {
            try
            {
                var dataFromFile = await _dashboardService.GetDashboardDetails(configName, PageSize, PageNumber);
                var msg = dataFromFile.Data.Count() > 0 ? "dashboard details loaded successfully" : "No Data found";
                return Ok(ServiceResponseDTO.SuccessResponsePagination(msg, dataFromFile));
            }
            catch (ArgumentException ex)
            {
                return HandleUserException(ex);
            }
            catch (Exception ex)
            {
                return HandleOtherException(ex);
            }
        }
    }
}
