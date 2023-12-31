﻿using Microsoft.Extensions.Hosting;

namespace PartsShop.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Surname { get; set; }
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string PasswordHash { get; set; } = null!;
        public string? Token { get; set; }
        public List<Order>? Orders { get; set; }
        public Cart? Cart { get; set; }
        public List<Notification> Notifications { get; set; } = new List<Notification>();
        
    }
}
