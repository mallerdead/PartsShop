﻿using PartsShop.Entities;

namespace PartsShop.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }
        public List<Order>? Orders { get; set; }
        public Cart? Cart { get; set; }
        public List<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
