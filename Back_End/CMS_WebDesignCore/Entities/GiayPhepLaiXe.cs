namespace CMS_WebDesignCore.Entities
{
    public partial class GiayPhepLaiXe : BaseEntity
    {
        public string? So { get; set; }
        public string? HoTen { get; set; }
        public string? NgaySinh { get; set; }
        public string? QuocTich { get; set; }
        public string? NoiCuTru { get; set; }
        public string? NgayDangKy { get; set; }
        public string? Hang { get; set; }
        public string? MoTaXeDuocSuDung { get; set; }
        public string? NgayTrungTuyen { get; set; }

        public int? IsSo { get; set; } = 100;
        public int? IsHoTen { get; set; } = 100;
        public int? IsNgaySinh { get; set; } = 100;
        public int? IsQuocTich { get; set; } = 100;
        public int? IsNoiCuTru { get; set; } = 100;
        public int? IsNgayDangKy { get; set; } = 100;
        public int? IsHang { get; set; } = 100;
        public int? IsMoTaXeDuocSuDung { get; set; } = 100;
        public int? IsNgayTrungTuyen { get; set; } = 100;
        public bool? DungTatCa { get; set; } = true;
        public override string? ToString()
        {
            return So + "-" + HoTen + "-" + NgaySinh + "-" + QuocTich + "-" + NoiCuTru + "-" + NgayDangKy + "-" + Hang + "-" + MoTaXeDuocSuDung + "-" + NgayTrungTuyen;
        }
        public int DuLieuId { get; set; }

        public DuLieu DuLieu { get; set; }
    }
}
