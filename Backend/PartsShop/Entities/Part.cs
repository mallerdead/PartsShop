namespace PartsShop.Entities
{
    public class Part
    {
        public int Id { get; set; }
        public int ManufactureId { get; set; }
        public string? Name { get; set; }
        public string? VendorCode { get; set; }
        public string? Description { get; set; }
        public string? PartSubDescription { get; set; }
        public string? Availability { get; set; }
        public int? Delivery { get; set; }
        public float Price { get; set; }
        public Manufacturer? Manufacturer { get; set; }
    }
}
