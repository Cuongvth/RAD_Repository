using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS_Infrastructure.Migrations
{
    public partial class craete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuLieus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatTruoc = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    MatSau = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuLieus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CanCuocCongDans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                    Vnm = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    DoChinhXacVnm = table.Column<int>(type: "int", nullable: true),
                    ChinhXac = table.Column<bool>(type: "bit", nullable: true),
                    DuLieuId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CanCuocCongDans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CanCuocCongDans_DuLieus_DuLieuId",
                        column: x => x.DuLieuId,
                        principalTable: "DuLieus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GiayPhepLaiXes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                    DuLieuId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiayPhepLaiXes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GiayPhepLaiXes_DuLieus_DuLieuId",
                        column: x => x.DuLieuId,
                        principalTable: "DuLieus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CanCuocCongDans_DuLieuId",
                table: "CanCuocCongDans",
                column: "DuLieuId");

            migrationBuilder.CreateIndex(
                name: "IX_GiayPhepLaiXes_DuLieuId",
                table: "GiayPhepLaiXes",
                column: "DuLieuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CanCuocCongDans");

            migrationBuilder.DropTable(
                name: "GiayPhepLaiXes");

            migrationBuilder.DropTable(
                name: "DuLieus");
        }
    }
}
