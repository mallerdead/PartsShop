using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartsShop.Data;

namespace PartsShop.Controllers
{
    [ApiController]
    [Route("notifications")]
    public class NotificationsController : Controller
    {
        private readonly DBContext DBContext;

        public NotificationsController(DBContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [HttpPut("mark-as-read")]
        public async Task<ActionResult> MarkNotificationAsRead([FromBody] NotificationData data)
        {
            var notification = await DBContext.Notifications.Where(notification => data.userId == notification.UserId && notification.Id == data.notificationId).FirstOrDefaultAsync();

            if (notification != null)
            {
                var isRead = notification.IsRead;
                notification.IsRead = true;
                await DBContext.SaveChangesAsync();
                return Ok();
            }

            return NotFound();
        }

        public class NotificationData
        {
            public int userId { get; set; }
            public int notificationId { get; set; }
        }
    }
}
