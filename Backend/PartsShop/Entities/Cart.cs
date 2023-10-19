namespace PartsShop.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Count { get; set; }
        public double TotalPrice { get; set; }
        public List<CartProduct>? Products { get; set; }

        public void CalculateCount()
        {
            Count = 0;

            if (Products != null)
            {
                Count = Products.Select(product => product.Count).Sum();
            }
        }

        public void CalculatePrice ()
        {
            TotalPrice = 0;

            if (Products != null)
            {
                TotalPrice = Math.Round(Products.Select(product => product.Count * product.Part.Price).Sum(), 2);
            }
        }
    }
}
