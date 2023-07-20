using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS_Infrastructure.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.AlterColumn<int>(
                name: "IsSo",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsQuocTich",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNoiCuTru",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNgayTrungTuyen",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNgaySinh",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNgayDangKy",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsMoTaXeDuocSuDung",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsHoTen",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsHang",
                table: "GiayPhepLaiXes",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AddColumn<string>(
                name: "GoogleMatSau",
                table: "DuLieus",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            _ = migrationBuilder.AddColumn<string>(
                name: "GoogleMatTruoc",
                table: "DuLieus",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            _ = migrationBuilder.AddColumn<bool>(
                name: "IsLoaiThe",
                table: "DuLieus",
                type: "bit",
                nullable: true);

            _ = migrationBuilder.AddColumn<int>(
                name: "IsMatSau",
                table: "DuLieus",
                type: "int",
                nullable: true);

            _ = migrationBuilder.AddColumn<int>(
                name: "IsMatTruoc",
                table: "DuLieus",
                type: "int",
                nullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsVNM",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsSoCCCD",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsQuocTich",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsQueQuan",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNoiThuongTru",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNgayThangNamSinh",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsNgayDangKy",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsHoTen",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsGioiTinh",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsDacDiemNhanDang",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<int>(
                name: "IsCoGiaTriDen",
                table: "CanCuocCongDans",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.DropColumn(
                name: "GoogleMatSau",
                table: "DuLieus");

            _ = migrationBuilder.DropColumn(
                name: "GoogleMatTruoc",
                table: "DuLieus");

            _ = migrationBuilder.DropColumn(
                name: "IsLoaiThe",
                table: "DuLieus");

            _ = migrationBuilder.DropColumn(
                name: "IsMatSau",
                table: "DuLieus");

            _ = migrationBuilder.DropColumn(
                name: "IsMatTruoc",
                table: "DuLieus");

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsSo",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsQuocTich",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNoiCuTru",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNgayTrungTuyen",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNgaySinh",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNgayDangKy",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsMoTaXeDuocSuDung",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsHoTen",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsHang",
                table: "GiayPhepLaiXes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsVNM",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsSoCCCD",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsQuocTich",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsQueQuan",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNoiThuongTru",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNgayThangNamSinh",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsNgayDangKy",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsHoTen",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsGioiTinh",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsDacDiemNhanDang",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            _ = migrationBuilder.AlterColumn<bool>(
                name: "IsCoGiaTriDen",
                table: "CanCuocCongDans",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
