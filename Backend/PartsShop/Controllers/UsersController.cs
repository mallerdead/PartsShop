using System.Net;
using PartsShop.DTO;
using PartsShop.Data;
using PartsShop.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors;

namespace PartsShop.Controllers
{
    [Route("users")]
    [ApiController]
    [EnableCors("AllowOrigin")]
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
        public async Task<ActionResult<UserDTO>> VerifyToken()
        {
            var user = await DBContext.Users.Where(user => user.Token == Request.Headers.Authorization.ToString()).FirstOrDefaultAsync();

            if (user != null)
            {
                var userDTO = new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Email = user.Email,
                    Phone = user.Phone,
                    Token = user.Token,
                };
                return Ok(userDTO);
            }

            return Unauthorized();
        }

        [HttpPost("user-login")]
        public async Task<ActionResult<UserDTO>> UserLogin(UserLoginModel userLogin)
        {

            var user = await DBContext.Users.FirstOrDefaultAsync(userEntity => userEntity.Email == userLogin.Email);
            if (user != null && BCrypt.Net.BCrypt.Verify(userLogin.Password, user.PasswordHash, true, BCrypt.Net.HashType.SHA256))
            {
                user.Token = GenerateToken(user.Id);
                await DBContext.SaveChangesAsync();

                var resultUser = new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Email = user.Email,
                    Phone = user.Phone,
                    Token = user.Token,
                    Password = user.PasswordHash
                };
                return Ok(resultUser);
            };

            return Unauthorized();
        }

        [HttpPost("user-registration")]
        public async Task<ActionResult<User>> UserRegistration(UserDTO registeringUser)
        {
            if (DBContext.Users.Where(user => user.Email == registeringUser.Email).Count() > 0) 
            {
                return Conflict("Пользователь уже существует");
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

        private string? GenerateToken(int userId)
        {
            string secretKey = _config["Jwt:Key"];
            if (secretKey != null)
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                    new Claim("userId", userId.ToString())
                };
                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Issuer"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: creds
                    );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            return null;
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(), true, BCrypt.Net.HashType.SHA256);
        }
    }
}
