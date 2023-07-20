using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS_Infrastructure.Migrations
{
    public partial class create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.CreateTable(
                name: "DuLieus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatTruoc = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    MatSau = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ThoiGianThem = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianXacNhan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_DuLieus", x => x.Id);
                });

            _ = migrationBuilder.CreateTable(
                name: "CanCuocCongDans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoCCCD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayThangNamSinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuocTich = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QueQuan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiThuongTru = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoGiaTriDen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DacDiemNhanDang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayDangKy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VNM = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSoCCCD = table.Column<bool>(type: "bit", nullable: true),
                    IsHoTen = table.Column<bool>(type: "bit", nullable: true),
                    IsNgayThangNamSinh = table.Column<bool>(type: "bit", nullable: true),
                    IsGioiTinh = table.Column<bool>(type: "bit", nullable: true),
                    IsQuocTich = table.Column<bool>(type: "bit", nullable: true),
                    IsQueQuan = table.Column<bool>(type: "bit", nullable: true),
                    IsNoiThuongTru = table.Column<bool>(type: "bit", nullable: true),
                    IsCoGiaTriDen = table.Column<bool>(type: "bit", nullable: true),
                    IsDacDiemNhanDang = table.Column<bool>(type: "bit", nullable: true),
                    IsNgayDangKy = table.Column<bool>(type: "bit", nullable: true),
                    IsVNM = table.Column<bool>(type: "bit", nullable: true),
                    DungTatCa = table.Column<bool>(type: "bit", nullable: true),
                    DuLieuId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_CanCuocCongDans", x => x.Id);
                    _ = table.ForeignKey(
                        name: "FK_CanCuocCongDans_DuLieus_DuLieuId",
                        column: x => x.DuLieuId,
                        principalTable: "DuLieus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            _ = migrationBuilder.CreateTable(
                name: "GiayPhepLaiXes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    So = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuocTich = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiCuTru = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayDangKy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MoTaXeDuocSuDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTrungTuyen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSo = table.Column<bool>(type: "bit", nullable: true),
                    IsHoTen = table.Column<bool>(type: "bit", nullable: true),
                    IsNgaySinh = table.Column<bool>(type: "bit", nullable: true),
                    IsQuocTich = table.Column<bool>(type: "bit", nullable: true),
                    IsNoiCuTru = table.Column<bool>(type: "bit", nullable: true),
                    IsNgayDangKy = table.Column<bool>(type: "bit", nullable: true),
                    IsHang = table.Column<bool>(type: "bit", nullable: true),
                    IsMoTaXeDuocSuDung = table.Column<bool>(type: "bit", nullable: true),
                    IsNgayTrungTuyen = table.Column<bool>(type: "bit", nullable: true),
                    DungTatCa = table.Column<bool>(type: "bit", nullable: true),
                    DuLieuId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_GiayPhepLaiXes", x => x.Id);
                    _ = table.ForeignKey(
                        name: "FK_GiayPhepLaiXes_DuLieus_DuLieuId",
                        column: x => x.DuLieuId,
                        principalTable: "DuLieus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            _ = migrationBuilder.CreateIndex(
                name: "IX_CanCuocCongDans_DuLieuId",
                table: "CanCuocCongDans",
                column: "DuLieuId");

            _ = migrationBuilder.CreateIndex(
                name: "IX_GiayPhepLaiXes_DuLieuId",
                table: "GiayPhepLaiXes",
                column: "DuLieuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.DropTable(
                name: "CanCuocCongDans");

            _ = migrationBuilder.DropTable(
                name: "GiayPhepLaiXes");

            _ = migrationBuilder.DropTable(
                name: "DuLieus");
        }
    }
}
