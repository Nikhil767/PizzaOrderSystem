namespace Domain.Entities
{
    public class LookupItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Prize { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }
        public string ImagePath { get; set; }
        public string PrizeUnit { get; set; }
    }
}
