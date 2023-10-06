using PartsShop.Entities;

namespace PartsShop.DTO
{
    public class CartDTO
    {
        public List<Part> Parts { get; set; }
        public float TotalSum { get; set; } = 0;
        public int CountItems { get; set; } = 0;

        public CartDTO(List<Part> parts, string partsId)
        {
            Parts = new List<Part>();

            foreach (var id in partsId.Split()) 
            {
                foreach (var part in parts)
                {
                    if (part.Id == Int32.Parse(id))
                    {
                        Parts.Add(part);
                        TotalSum += part.Price;
                        CountItems++;
                    }
                }
            }
            
        }
    }
}
