namespace PartsShop.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int UserId { get; set; }
        public DateTime? Date { get; set; }
        public float Total { get; set; }
        public int TotalCount { get; set; }
        public List<OrderProduct>? Products { get; set; }
    }
}
