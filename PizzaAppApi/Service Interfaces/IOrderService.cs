using Domain.DTO;
using System.Threading.Tasks;

namespace Service_Interfaces
{
    public interface IOrderService
    {
        Task<bool> PlaceUserOrder(OrderDTO orderDetailsDTO);
    }
}
