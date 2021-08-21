using System.Collections.Generic;

namespace Domain.Entities
{
    public class Pizza
    {
        public bool IsCustomPizza { get; set; }
        public List<Item> PizzaItems { get; set; }
    }
}
