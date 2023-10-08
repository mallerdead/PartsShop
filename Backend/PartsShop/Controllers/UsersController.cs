using PartsShop.DTO;
using PartsShop.Data;
using PartsShop.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

namespace PartsShop.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly DBContext DBContext;
        private readonly IConfiguration _config;

        public UsersController(DBContext DBContext, IConfiguration config)
        {
            this.DBContext = DBContext;
            _config = config;
        }

        [HttpGet("verify-token")]
        public async Task<ActionResult<int>> VerifyToken()
        {
            var user = await DBContext.Users.Where(user => user.Token == Request.Headers.Authorization.ToString()).FirstOrDefaultAsync();

            if (user != null)
            {
                return Ok(user.Id);
            }

            return Unauthorized();
        }

        [HttpGet("user/")]
        public async Task<ActionResult<UserDTO>> GetUserById([FromQuery] int id)
        {
            var notifications = await DBContext.Notifications.ToListAsync();
            var parts = await DBContext.Parts.ToListAsync();
            var cart = await DBContext.Carts.ToListAsync();
            var user = await DBContext.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
            var products = await DBContext.CartProducts.ToListAsync();

            if (user != null)
            {
                var userDTO = new UserDTO()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Email = user.Email,
                    Phone = user.Phone,
                    Cart = user.Cart,
                    Notifications = user.Notifications
                };

                return Ok(userDTO);
            }

            return NotFound();
        }


        [HttpPut("change-user-data")]
        public async Task<ActionResult> ChangeUserName([FromBody] UserDTO newData)
        {
            var user = await DBContext.Users.Where(user => user.Id == newData.Id).FirstOrDefaultAsync();

            if (user != null)
            {
                user.Name = newData.Name ?? user.Name;
                user.Surname = newData.Surname == "" ? null : newData.Surname ?? user.Surname;
                user.Email = newData.Email ?? user.Email;
                user.Phone = newData.Phone ?? user.Phone;
                await DBContext.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
        }


        [HttpPost("user-login")]
        public async Task<ActionResult<string>> UserLogin(UserLoginModel userLogin)
        {
            var user = await DBContext.Users.FirstOrDefaultAsync(userEntity => userEntity.Email == userLogin.Email);
            if (user != null && BCrypt.Net.BCrypt.Verify(userLogin.Password, user.PasswordHash, true, BCrypt.Net.HashType.SHA256))
            {
                user.Token = GenerateToken(user.Id);
                await DBContext.SaveChangesAsync();

                return Ok(user.Token);
            };

            return Unauthorized();
        }

        [HttpPost("user-registration")]
        public async Task<ActionResult<User>> UserRegistration(UserDTO registeringUser)
        {
            if (DBContext.Users.Where(user => user.Email == registeringUser.Email).Count() > 0)
            {
                return Conflict();
            }

            var userEntity = new User
            {
                Id = registeringUser.Id,
                Name = registeringUser.Name,
                Surname = registeringUser.Surname != "" ? registeringUser.Surname : null,
                Email = registeringUser.Email,
                Phone = registeringUser.Phone != "" ? registeringUser.Phone : null,
                PasswordHash = HashPassword(registeringUser.Password),
            };

            DBContext.Users.Add(userEntity);
            await DBContext.SaveChangesAsync();

            userEntity.Token = GenerateToken(userEntity.Id);
            await DBContext.SaveChangesAsync();

            return Ok(userEntity);
        }

        [HttpPost("delete-token-by-id")]
        public async Task<ActionResult> DeleteToken([FromQuery] int id) {
            var user = await DBContext.Users.FirstOrDefaultAsync(user => user.Id == id);

            if (user != null)
            {
                user.Token = null;
                await DBContext.SaveChangesAsync();

                return Ok();
            }

            return NotFound();
        }


        private string? GenerateToken(int userId)
        {
            string secretKey = _config["Jwt:Key"];

            if (secretKey != null)
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var claims = new[] { new Claim("userId", userId.ToString()) };
                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Issuer"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            return null;
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(), true, BCrypt.Net.HashType.SHA256);
        }

        public class UserLoginModel
        {
            public string Email { get; set; } = null!;
            public string Password { get; set; } = null!;
        }
    }
}
