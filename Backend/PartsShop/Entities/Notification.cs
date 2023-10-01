﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace PartsShop.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
    }
}