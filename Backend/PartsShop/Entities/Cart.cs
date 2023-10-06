namespace PartsShop.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PartsId { get; set; } = string.Empty;
    }
}
