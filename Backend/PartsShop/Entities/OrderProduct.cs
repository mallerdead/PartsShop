namespace PartsShop.Entities
{
    public class OrderProduct
    {
        public int PartId { get; set; }
        public int OrderId { get; set; }
        public int Count { get; set; }
        public string? Status { get; set; }
        public Part? Part { get; set; }
    }
}
