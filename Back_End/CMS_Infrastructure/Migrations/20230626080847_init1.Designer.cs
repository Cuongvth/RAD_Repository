﻿// <auto-generated />
using System;
using CMS_Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CMS_Infrastructure.Migrations
{
    [DbContext(typeof(ComputerVisionContext))]
    [Migration("20230626080847_init1")]
    partial class init1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.18")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CMS_WebDesignCore.Entities.CanCuocCongDan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CoGiaTriDen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DacDiemNhanDang")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DuLieuId")
                        .HasColumnType("int");

                    b.Property<bool?>("DungTatCa")
                        .HasColumnType("bit");

                    b.Property<string>("GioiTinh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IsCoGiaTriDen")
                        .HasColumnType("int");

                    b.Property<int?>("IsDacDiemNhanDang")
                        .HasColumnType("int");

                    b.Property<int?>("IsGioiTinh")
                        .HasColumnType("int");

                    b.Property<int?>("IsHoTen")
                        .HasColumnType("int");

                    b.Property<int?>("IsNgayDangKy")
                        .HasColumnType("int");

                    b.Property<int?>("IsNgayThangNamSinh")
                        .HasColumnType("int");

                    b.Property<int?>("IsNoiThuongTru")
                        .HasColumnType("int");

                    b.Property<int?>("IsQueQuan")
                        .HasColumnType("int");

                    b.Property<int?>("IsQuocTich")
                        .HasColumnType("int");

                    b.Property<int?>("IsSoCCCD")
                        .HasColumnType("int");

                    b.Property<int?>("IsVNM")
                        .HasColumnType("int");

                    b.Property<string>("NgayDangKy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NgayThangNamSinh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NoiThuongTru")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QueQuan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QuocTich")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoCCCD")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VNM")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DuLieuId");

                    b.ToTable("CanCuocCongDans");
                });

            modelBuilder.Entity("CMS_WebDesignCore.Entities.DuLieu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("GoogleMatSau")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GoogleMatTruoc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsLoaiThe")
                        .HasColumnType("bit");

                    b.Property<int?>("IsMatSau")
                        .HasColumnType("int");

                    b.Property<int?>("IsMatTruoc")
                        .HasColumnType("int");

                    b.Property<byte[]>("MatSau")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("MatTruoc")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("ThoiGianThem")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ThoiGianXacNhan")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("DuLieus");
                });

            modelBuilder.Entity("CMS_WebDesignCore.Entities.GiayPhepLaiXe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("DuLieuId")
                        .HasColumnType("int");

                    b.Property<bool?>("DungTatCa")
                        .HasColumnType("bit");

                    b.Property<string>("Hang")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IsHang")
                        .HasColumnType("int");

                    b.Property<int?>("IsHoTen")
                        .HasColumnType("int");

                    b.Property<int?>("IsMoTaXeDuocSuDung")
                        .HasColumnType("int");

                    b.Property<int?>("IsNgayDangKy")
                        .HasColumnType("int");

                    b.Property<int?>("IsNgaySinh")
                        .HasColumnType("int");

                    b.Property<int?>("IsNgayTrungTuyen")
                        .HasColumnType("int");

                    b.Property<int?>("IsNoiCuTru")
                        .HasColumnType("int");

                    b.Property<int?>("IsQuocTich")
                        .HasColumnType("int");

                    b.Property<int?>("IsSo")
                        .HasColumnType("int");

                    b.Property<string>("MoTaXeDuocSuDung")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NgayDangKy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NgaySinh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NgayTrungTuyen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NoiCuTru")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QuocTich")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("So")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DuLieuId");

                    b.ToTable("GiayPhepLaiXes");
                });

            modelBuilder.Entity("CMS_WebDesignCore.Entities.CanCuocCongDan", b =>
                {
                    b.HasOne("CMS_WebDesignCore.Entities.DuLieu", "DuLieu")
                        .WithMany()
                        .HasForeignKey("DuLieuId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DuLieu");
                });

            modelBuilder.Entity("CMS_WebDesignCore.Entities.GiayPhepLaiXe", b =>
                {
                    b.HasOne("CMS_WebDesignCore.Entities.DuLieu", "DuLieu")
                        .WithMany()
                        .HasForeignKey("DuLieuId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DuLieu");
                });
#pragma warning restore 612, 618
        }
    }
}