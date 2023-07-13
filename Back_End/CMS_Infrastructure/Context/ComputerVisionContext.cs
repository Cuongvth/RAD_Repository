using CMS_WebDesignCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS_Infrastructure.Context
{
    public partial class ComputerVisionContext : DbContext
    {
        public DbSet<CanCuocCongDan> CanCuocCongDans { get; set; }
        public DbSet<DuLieu> DuLieus { get; set; }
        public DbSet<GiayPhepLaiXe> GiayPhepLaiXes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //   _ = optionsBuilder.UseSqlServer("Server=LOTUS-PC\\SQLEXPRESS;Database=djxuyen1_rd;User ID=sa;Password=1231234;Encrypt=True;TrustServerCertificate=True;MultipleActiveResultSets=true");
            //  _ = optionsBuilder.UseSqlServer("Server=125.212.224.205;Database=djxuyen1_rd;User ID=djxuyen1_remote;Password=Mamama99@;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;MultipleActiveResultSets=true");
            _ = optionsBuilder.UseSqlServer("Server=localhost;Database=djxuyen1_rd;User ID=djxuyen1_remote;Password=Mamama99@;Encrypt=True;TrustServerCertificate=True;MultipleActiveResultSets=true");
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    _ = modelBuilder.Entity<CanCuocCongDan>(entity =>
        //    {
        //        _ = entity.ToTable("CanCuocCongDan");

        //        _ = entity.Property(e => e.Id).ValueGeneratedNever();

        //        _ = entity.Property(e => e.DoChinhXacVnm).HasColumnName("DoChinhXacVNM");

        //        _ = entity.Property(e => e.DuLieuId).HasColumnName("DuLieu_Id");

        //        _ = entity.Property(e => e.Vnm).HasColumnName("VNM");

        //        _ = entity.HasOne(d => d.DuLieu)
        //            .WithMany(p => p.CanCuocCongDans)
        //            .HasForeignKey(d => d.DuLieuId);
        //    });

        //    _ = modelBuilder.Entity<DuLieu>(entity =>
        //    {
        //        _ = entity.ToTable("DuLieu");

        //        _ = entity.Property(e => e.Id).ValueGeneratedNever();
        //    });

        //    _ = modelBuilder.Entity<GiayPhepLaiXe>(entity =>
        //    {
        //        _ = entity.ToTable("GiayPhepLaiXe");

        //        _ = entity.Property(e => e.Id).ValueGeneratedNever();

        //        _ = entity.Property(e => e.DuLieuId).HasColumnName("DuLieu_Id");

        //        _ = entity.HasOne(d => d.DuLieu)
        //            .WithMany(p => p.GiayPhepLaiXes)
        //            .HasForeignKey(d => d.DuLieuId);
        //    });

        //    OnModelCreatingPartial(modelBuilder);
        //}

        //partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
