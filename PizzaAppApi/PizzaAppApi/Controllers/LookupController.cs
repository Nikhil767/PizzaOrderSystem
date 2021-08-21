using Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Service_Interfaces;
using System;
using System.Threading.Tasks;

namespace AngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : DefaultControllerBase
    {
        private readonly ILookupService _lookupService;
        protected readonly ILogger<LookupController> logger;

        public LookupController(ILookupService lookupService, ILogger<LookupController> logger) : base(logger)
        {
            _lookupService = lookupService;
        }

        [HttpGet, Route("{configName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get([FromRoute] string configName)
        {
            try
            {
                var dataFromFile = await _lookupService.GetConfigurationsDetails(configName);
                return Ok(ServiceResponseDTO.SuccessResponse($"{configName} configuration loaded successfully", dataFromFile));
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
