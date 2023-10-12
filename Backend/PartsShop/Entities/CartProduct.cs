namespace PartsShop.Entities
{
    public class CartProduct
    {
        public int PartId { get; set; }
        public int CartId { get; set; }
        public int Count { get; set; }
        public Part? Part { get; set; }
    }
}
