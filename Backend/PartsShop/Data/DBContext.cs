using Microsoft.EntityFrameworkCore;
using PartsShop.Entities;
using System.Diagnostics;
using System.Reflection.Metadata;

namespace PartsShop.Data
{
    public partial class DBContext : Microsoft.EntityFrameworkCore.DbContext
    {

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Part> Parts { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Manufacturer> Manufactures{ get; set; }
        public virtual DbSet<CartProduct> CartProducts { get; set; }
        public virtual DbSet<OrderProduct> OrderProducts { get; set; }

        public DBContext()
        {

        }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("users");

                entity.HasOne(e => e.Cart).WithOne().HasForeignKey<Cart>(d => d.UserId);
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("notifications");
            });

            modelBuilder.Entity<Part>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("parts");

                entity.HasOne(d => d.Manufacturer).WithMany().HasForeignKey(d => d.ManufactureId);
            });

            modelBuilder.Entity<Manufacturer>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("manufactures");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("carts");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("orders");
            });

            modelBuilder.Entity<CartProduct>(entity =>
            {
                entity.HasKey(e => new { e.PartId, e.CartId });

                entity.ToTable("cartproducts");
            });

            modelBuilder.Entity<OrderProduct>(entity =>
            {
                entity.HasKey(e => new { e.PartId, e.OrderId });

                entity.ToTable("orderproducts");
            });

            OnModelCreatingPartial(modelBuilder);
        }
    }
}