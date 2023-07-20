namespace CMS_WebDesignCore.Entities.Entities_OCR
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
        public int? IsSoCCCD { get; set; } = 100;
        public int? IsHoTen { get; set; } = 100;
        public int? IsNgayThangNamSinh { get; set; } = 100;
        public int? IsGioiTinh { get; set; } = 100;
        public int? IsQuocTich { get; set; } = 100;
        public int? IsQueQuan { get; set; } = 100;
        public int? IsNoiThuongTru { get; set; } = 100;
        public int? IsCoGiaTriDen { get; set; } = 100;
        public int? IsDacDiemNhanDang { get; set; } = 100;
        public int? IsNgayDangKy { get; set; } = 100;
        public int? IsVNM { get; set; } = 100;
        public bool? DungTatCa { get; set; } = true;
        public override string? ToString()
        {
            return $"{SoCCCD}-{HoTen}-{NgayThangNamSinh}-{GioiTinh}-{QuocTich}-{QueQuan}-{NoiThuongTru}-{CoGiaTriDen}-{DacDiemNhanDang}-{NgayDangKy}-{VNM}";
        }
        public int DuLieuId { get; set; }

        public DuLieu? DuLieu { get; set; }
    }
}
