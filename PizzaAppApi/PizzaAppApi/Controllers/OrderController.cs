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
    public class OrderController : DefaultControllerBase
    {
        private readonly IOrderService _orderService;
        protected readonly ILogger<OrderController> logger;

        public OrderController(IOrderService orderService, ILogger<OrderController> logger) : base(logger)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PlaceUserOrder([FromBody] OrderDTO orderDetailsDTO)
        {
            try
            {
                var dataFromFile = await _orderService.PlaceUserOrder(orderDetailsDTO);
                return Ok(ServiceResponseDTO.SuccessResponse("Order is placed successfully", dataFromFile));
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
