using Microsoft.AspNetCore.Mvc;
using PartsShop.Data;

namespace PartsShop.Controllers
{
    [ApiController]
    [Route("notifications")]
    public class NotificationsController : Controller
    {
        private readonly DBContext DBContext;
        private readonly IConfiguration _config;


        public NotificationsController(DBContext DBContext, IConfiguration config)
        {
            this.DBContext = DBContext;
            _config = config;
        }

        [HttpPut("mark-as-read")]
        public async Task<ActionResult> MarkNotificationAsRead([FromQuery] int notificationId) {
            var notification = await DBContext.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                return Ok(notification);
            }
            return NotFound();
        }
    }
}
