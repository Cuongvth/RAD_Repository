using CMS_Infrastructure.Models;
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

        public virtual DbSet<CanCuocCongDan> CanCuocCongDans { get; set; } = null!;
        public virtual DbSet<DuLieu> DuLieus { get; set; } = null!;
        public virtual DbSet<GiayPhepLaiXe> GiayPhepLaiXes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                _ = optionsBuilder.UseSqlServer("Server=DESKTOP-HD7DTQA\\SQLEXPRESS;Database=ComputerVision;User ID=sa;Password=191023;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _ = modelBuilder.Entity<CanCuocCongDan>(entity =>
            {
                _ = entity.ToTable("CanCuocCongDan");

                _ = entity.Property(e => e.Id).ValueGeneratedNever();

                _ = entity.Property(e => e.DoChinhXacVnm).HasColumnName("DoChinhXacVNM");

                _ = entity.Property(e => e.DuLieuId).HasColumnName("DuLieu_Id");

                _ = entity.Property(e => e.Vnm).HasColumnName("VNM");

                _ = entity.HasOne(d => d.DuLieu)
                    .WithMany(p => p.CanCuocCongDans)
                    .HasForeignKey(d => d.DuLieuId)
                    .HasConstraintName("CanCuocCongDan_DuLieu");
            });

            _ = modelBuilder.Entity<DuLieu>(entity =>
            {
                _ = entity.ToTable("DuLieu");

                _ = entity.Property(e => e.Id).ValueGeneratedNever();

                _ = entity.Property(e => e.MatSau).HasColumnType("image");

                _ = entity.Property(e => e.MatTruoc).HasColumnType("image");
            });

            _ = modelBuilder.Entity<GiayPhepLaiXe>(entity =>
            {
                _ = entity.ToTable("GiayPhepLaiXe");

                _ = entity.Property(e => e.Id).ValueGeneratedNever();

                _ = entity.Property(e => e.DuLieuId).HasColumnName("DuLieu_Id");

                _ = entity.HasOne(d => d.DuLieu)
                    .WithMany(p => p.GiayPhepLaiXes)
                    .HasForeignKey(d => d.DuLieuId)
                    .HasConstraintName("GiayPhepLaiXe_DuLieu");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
