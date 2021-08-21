using Domain.Interfaces;

namespace Domain.DTO
{
    public class ServiceResponseDTO<T>
    {
        public string Message { get; set; }
        public T Data { get; set; }
        public bool Success { get; set; }
    }
    public class ServiceResponseDTO : ServiceResponseDTO<object>
    {
        public static IPagedResponseDTO<T> SuccessResponsePagination<T>(string message, IPagedResponseDTO<T> payload)
        {
            payload.Success = true;
            payload.Message = message;
            return payload;
        }

        public static ServiceResponseDTO<T> SuccessResponse<T>(string message, T payload)
        {
            return new ServiceResponseDTO<T>
            {
                Success = true,
                Data = payload,
                Message = message
            };
        }
    }
}
