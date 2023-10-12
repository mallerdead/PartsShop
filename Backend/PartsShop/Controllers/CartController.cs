using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartsShop.Data;
using PartsShop.Entities;

namespace PartsShop.Controllers
{
    [Route("cart")]
    [ApiController]
    public class CartControllers : ControllerBase
    {
        private readonly DBContext DBContext;

        public CartControllers(DBContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [HttpPost("remove-part")]
        public async Task<ActionResult> RemoveFromCart([FromQuery]int userId, int productId)
        {
            var user = await DBContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
            
            if (user != null)
            {
                var product = user?.Cart?.Products?.Find(product => product.PartId == productId);
                if (product != null)
                {
                    DBContext.CartProducts.Remove(product);
                    await DBContext.SaveChangesAsync();
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpPost("change-count")]
        public async Task<ActionResult> ChangeCount([FromQuery]int userId, int newCount, int productId)
        {
            var user = await DBContext.Users.FirstOrDefaultAsync(user => user.Id == userId);

            if (user != null)
            {
                var product = user?.Cart?.Products?.Find(product => product.PartId == productId);
                if (product != null)
                {
                    product.Count = newCount;
                    await DBContext.SaveChangesAsync();
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpPost("add-to-cart")]
        public async Task<ActionResult> AddToCartById([FromBody] CartProduct cartProduct)
        {
            if (cartProduct != null)
            {
                DBContext.CartProducts.Add(cartProduct);
                await DBContext.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
        }
    }
}
