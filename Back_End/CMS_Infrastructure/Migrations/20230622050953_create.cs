using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS_Infrastructure.Migrations
{
    public partial class create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuLieu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    MatTruoc = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    MatSau = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuLieu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CanCuocCongDan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    So = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuocTich = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayHetHan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChiThuongTru = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QueQuan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DacDiemNhanDang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayCap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VNM = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DoChinhXacSo = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacHoTen = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacNgaySinh = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacGioiTinh = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacQuocTich = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacNgayHetHan = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacDiaChiThuongTru = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacQueQuan = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacDacDiemNhanDang = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacNgayCap = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacVNM = table.Column<int>(type: "int", nullable: true),
                    ChinhXac = table.Column<bool>(type: "bit", nullable: true),
                    DuLieu_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CanCuocCongDan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CanCuocCongDan_DuLieu_DuLieu_Id",
                        column: x => x.DuLieu_Id,
                        principalTable: "DuLieu",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GiayPhepLaiXe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    So = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhuongTienDuocPhep = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTrungTuyen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayDangKi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DoChinhXacSo = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacHoTen = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacNgaySinh = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacGioiTinh = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacHang = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacDiaChi = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacPhuongTienDuocPhep = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacNgayTrungTuyen = table.Column<int>(type: "int", nullable: true),
                    DoChinhXacNgayDangKi = table.Column<int>(type: "int", nullable: true),
                    ChinhXac = table.Column<bool>(type: "bit", nullable: true),
                    DuLieu_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiayPhepLaiXe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GiayPhepLaiXe_DuLieu_DuLieu_Id",
                        column: x => x.DuLieu_Id,
                        principalTable: "DuLieu",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CanCuocCongDan_DuLieu_Id",
                table: "CanCuocCongDan",
                column: "DuLieu_Id");

            migrationBuilder.CreateIndex(
                name: "IX_GiayPhepLaiXe_DuLieu_Id",
                table: "GiayPhepLaiXe",
                column: "DuLieu_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CanCuocCongDan");

            migrationBuilder.DropTable(
                name: "GiayPhepLaiXe");

            migrationBuilder.DropTable(
                name: "DuLieu");
        }
    }
}
