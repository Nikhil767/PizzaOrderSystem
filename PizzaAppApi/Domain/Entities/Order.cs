using System;

namespace Domain.Entities
{
    public class Order
    {
        public string OrderID { get; set; } = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 8);
        public float TotalPrize { get; set; }
        public string PrizeUnit { get; set; }
        public Pizza[] OrderItems { get; set; }
        public DateTime CreatedDate => DateTime.Now;
    }
}
