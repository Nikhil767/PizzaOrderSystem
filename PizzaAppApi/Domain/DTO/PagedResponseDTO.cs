using Domain.Interfaces;
using System.Collections.Generic;

namespace Domain.DTO
{
    public class PagedResponseDTO<T> : IPagedResponseDTO<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public int TotalRecords { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}
