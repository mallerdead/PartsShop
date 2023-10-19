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
        public async Task<ActionResult<Cart>> RemoveFromCart([FromBody] CartProduct cartProduct)
        {
            var cart = await DBContext.Carts.Include(cart => cart.Products).ThenInclude(product => product.Part).FirstOrDefaultAsync(cart => cart.Id == cartProduct.CartId);

            if (cart != null)
            {
                var product = cart.Products.Find(product => product.PartId == cartProduct.PartId);

                if (product != null)
                {
                    cart.Products.Remove(product);
                    cart.CalculateCount();
                    cart.CalculatePrice();
                    await DBContext.SaveChangesAsync();

                    return Ok(cart);
                }
            }

            return BadRequest();
        }

        [HttpPost("change-count")]
        public async Task<ActionResult<Cart>> ChangeCount([FromBody] CartProduct cartProduct)
        {
            var cart = await DBContext.Carts.Include(cart => cart.Products).ThenInclude(product => product.Part).FirstOrDefaultAsync(cart => cart.Id == cartProduct.CartId);

            if (cart != null)
            {
                var product = cart.Products?.Find(product => product.PartId == cartProduct.PartId);

                if (product != null)
                {
                    product.Count = cartProduct.Count;
                    cart.CalculateCount();
                    cart.CalculatePrice();
                    await DBContext.SaveChangesAsync();

                    return Ok(cart);
                }
            }

            return BadRequest();
        }

        [HttpPost("add-to-cart")]
        public async Task<ActionResult<Cart>> AddToCartById([FromBody] CartProduct cartProduct)
        {
            var cart = await DBContext.Carts.Include(cart => cart.Products).ThenInclude(product => product.Part).FirstOrDefaultAsync(cart => cart.Id == cartProduct.CartId);

            if (cart != null)
            {
                var product = cart.Products.Find(product => product.PartId == cartProduct.PartId);

                if (product != null)
                {
                    product.Count += cartProduct.Count;
                }
                else
                {
                    cartProduct.Part = DBContext.Parts.FirstOrDefault(part => part.Id == cartProduct.PartId);
                    cart.Products.Add(cartProduct);
                }

                cart.CalculateCount();
                cart.CalculatePrice();
                await DBContext.SaveChangesAsync();

                return Ok(cart);
            }

            return BadRequest();
        }
    }
}