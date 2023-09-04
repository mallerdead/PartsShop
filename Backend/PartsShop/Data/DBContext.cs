using Microsoft.EntityFrameworkCore;
using PartsShop.Entities;

namespace PartsShop.Data
{
    public partial class DBContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public virtual DbSet<User> Users { get; set; }

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

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Name).HasMaxLength(60).HasColumnName("Name");
                entity.Property(e => e.Surname).HasMaxLength(60).HasColumnName("Surname");
                entity.Property(e => e.Email).HasMaxLength(100).HasColumnName("Email");
                entity.Property(e => e.Phone).HasMaxLength(12).HasColumnName("Phone");
                entity.Property(e => e.PasswordHash).HasMaxLength(1000).HasColumnName("PasswordHash");
                entity.Property(e => e.Token).HasMaxLength(1000).HasColumnName("Token");
            });

            OnModelCreatingPartial(modelBuilder);
        }
    }
}