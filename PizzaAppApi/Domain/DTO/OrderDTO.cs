using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTO
{
    public class OrderDTO
    {
        public string Email { get; set; }
        public Order Order { get; set; }
    }
}
