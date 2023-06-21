using CMS_WebDesignCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS_Infrastructure.Context
{
    public partial class ComputerVisionContext : DbContext
    {
        public ComputerVisionContext()
        {
        }

        public ComputerVisionContext(DbContextOptions<ComputerVisionContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CitizenIdentification> CitizenIdentifications { get; set; } = null!;
        public virtual DbSet<Datum> Data { get; set; } = null!;
        public virtual DbSet<DrivingLicense> DrivingLicenses { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                _ = optionsBuilder.UseSqlServer("Server=DESKTOP-HD7DTQA\\SQLEXPRESS;Database=ComputerVision;User ID=sa;Password=191023;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _ = modelBuilder.Entity<CitizenIdentification>(entity =>
            {
                _ = entity.ToTable("CitizenIdentification");

                _ = entity.Property(e => e.Id).ValueGeneratedNever();

                _ = entity.HasOne(d => d.Data)
                    .WithMany(p => p.CitizenIdentifications)
                    .HasForeignKey(d => d.DataId);
            });

            _ = modelBuilder.Entity<Datum>(entity =>
            {
                _ = entity.Property(e => e.Id).ValueGeneratedNever();
            });

            _ = modelBuilder.Entity<DrivingLicense>(entity =>
            {
                _ = entity.ToTable("DrivingLicense");

                _ = entity.Property(e => e.Id).ValueGeneratedNever();

                _ = entity.HasOne(d => d.Data)
                    .WithMany(p => p.DrivingLicenses)
                    .HasForeignKey(d => d.DataId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
