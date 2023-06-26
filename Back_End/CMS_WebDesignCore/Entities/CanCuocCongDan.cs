namespace CMS_WebDesignCore.Entities
{
    public partial class CanCuocCongDan : BaseEntity
    {
        public string? SoCCCD { get; set; }
        public string? HoTen { get; set; }
        public string? NgayThangNamSinh { get; set; }
        public string? GioiTinh { get; set; }
        public string? QuocTich { get; set; }
        public string? QueQuan { get; set; }
        public string? NoiThuongTru { get; set; }
        public string? CoGiaTriDen { get; set; }
        public string? DacDiemNhanDang { get; set; }
        public string? NgayDangKy { get; set; }
        public string? VNM { get; set; }
        public int? IsSoCCCD { get; set; }
        public int? IsHoTen { get; set; }
        public int? IsNgayThangNamSinh { get; set; }
        public int? IsGioiTinh { get; set; }
        public int? IsQuocTich { get; set; }
        public int? IsQueQuan { get; set; }
        public int? IsNoiThuongTru { get; set; }
        public int? IsCoGiaTriDen { get; set; }
        public int? IsDacDiemNhanDang { get; set; }
        public int? IsNgayDangKy { get; set; }
        public int? IsVNM { get; set; }
        public bool? DungTatCa { get; set; }
        public override string? ToString()
        {
            return $"{SoCCCD}-{HoTen}-{NgayThangNamSinh}-{GioiTinh}-{QuocTich}-{QueQuan}-{NoiThuongTru}-{CoGiaTriDen}-{DacDiemNhanDang}-{NgayDangKy}-{VNM}";
        }
        public int DuLieuId { get; set; }

        public DuLieu DuLieu { get; set; }
    }
}
