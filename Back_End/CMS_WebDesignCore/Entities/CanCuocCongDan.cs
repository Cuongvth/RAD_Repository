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
        public bool? IsSoCCCD { get; set; }
        public bool? IsHoTen { get; set; }
        public bool? IsNgayThangNamSinh { get; set; }
        public bool? IsGioiTinh { get; set; }
        public bool? IsQuocTich { get; set; }
        public bool? IsQueQuan { get; set; }
        public bool? IsNoiThuongTru { get; set; }
        public bool? IsCoGiaTriDen { get; set; }
        public bool? IsDacDiemNhanDang { get; set; }
        public bool? IsNgayDangKy { get; set; }
        public bool? IsVNM { get; set; }
        public bool? DungTatCa { get; set; }
        public override string? ToString()
        {
            return $"{SoCCCD}-{HoTen}-{NgayThangNamSinh}-{GioiTinh}-{QuocTich}-{QueQuan}-{NoiThuongTru}-{CoGiaTriDen}-{DacDiemNhanDang}-{NgayDangKy}-{VNM}";
        }
        public int DuLieuId { get; set; }

        public DuLieu DuLieu { get; set; }
    }
}
