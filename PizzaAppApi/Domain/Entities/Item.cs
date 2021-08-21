namespace Domain.Entities
{
    public class Item : LookupItem
    {
        public bool IsDrink { get; set; }
        public bool IsBurger { get; set; }
        public bool IsPizza { get; set; }
    }
}
