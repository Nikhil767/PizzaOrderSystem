using Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace AngularDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultControllerBase : ControllerBase
    {
        protected readonly ILogger<DefaultControllerBase> Logger;
        public DefaultControllerBase(ILogger<DefaultControllerBase> logger)
        {
            Logger = logger;
        }
        protected IActionResult HandleUserException(Exception ex)
        {
            var serviceResponse = new ServiceResponseDTO
            {
                Data = null,
                Success = false,
                Message = ex.Message
            };
            Logger.LogWarning(ex, ex.Message);
            return BadRequest(serviceResponse);
        }

        protected IActionResult HandleOtherException(Exception ex)
        {
            var serviceResponse = new ServiceResponseDTO
            {
                Data = null,
                Success = false,
                Message = ex.Message
            };
            Logger.LogError(ex, ex.Message);
            return StatusCode(StatusCodes.Status500InternalServerError,serviceResponse);
        }
    }
}
