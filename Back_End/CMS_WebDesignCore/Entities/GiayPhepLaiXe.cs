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

        public bool? IsSo { get; set; }
        public bool? IsHoTen { get; set; }
        public bool? IsNgaySinh { get; set; }
        public bool? IsQuocTich { get; set; }
        public bool? IsNoiCuTru { get; set; }
        public bool? IsNgayDangKy { get; set; }
        public bool? IsHang { get; set; }
        public bool? IsMoTaXeDuocSuDung { get; set; }
        public bool? IsNgayTrungTuyen { get; set; }
        public bool? DungTatCa { get; set; }
        public override string? ToString()
        {
            return So + "-" + HoTen + "-" + NgaySinh + "-" + QuocTich + "-" + NoiCuTru + "-" + NgayDangKy + "-" + Hang + "-" + MoTaXeDuocSuDung + "-" + NgayTrungTuyen;
        }
        public int DuLieuId { get; set; }

        public DuLieu DuLieu { get; set; }
    }
}
