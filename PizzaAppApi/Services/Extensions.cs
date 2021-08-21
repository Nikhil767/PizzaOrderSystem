using Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public static class Extensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> collection)
        {
            return collection is null || !collection.Any();
        }

        public static PagedResponseDTO<T> PagedData<T>(this IEnumerable<T> collection, int pageSize, int pageNumber)
        {
            PagedResponseDTO<T> pagedData = default;
            if (collection.IsNotNullOrEmpty())
            {
                var totalCount = collection.Count();
                pagedData = new PagedResponseDTO<T>
                {
                    PageSize = pageSize,
                    PageNumber = pageNumber,
                    TotalRecords = totalCount,
                    Data = collection.Skip((pageNumber - 1) * pageSize).Take(pageSize),
                    PageCount = totalCount > 0 ? (int)Math.Ceiling(totalCount/(double)pageSize) : 0
                };
            }
            return pagedData;
        }

        public static bool IsNotNullOrEmpty<T>(this IEnumerable<T> collection)
        {
            return !collection.IsNullOrEmpty();
        }

        //public static string ToJsonString<T>(this T item)
        //{
        //    string jsonString = string.Empty;
        //    if (item != null)
        //    {
        //        jsonString = JsonConvert.SerializeObject(item, Formatting.Indented, new JsonSerializerSettings
        //        {
        //            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        //        });
        //    }
        //    return jsonString;
        //}
    }
}
