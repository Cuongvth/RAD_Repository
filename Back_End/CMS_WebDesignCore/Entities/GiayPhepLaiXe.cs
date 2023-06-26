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

        public int? IsSo { get; set; }
        public int? IsHoTen { get; set; }
        public int? IsNgaySinh { get; set; }
        public int? IsQuocTich { get; set; }
        public int? IsNoiCuTru { get; set; }
        public int? IsNgayDangKy { get; set; }
        public int? IsHang { get; set; }
        public int? IsMoTaXeDuocSuDung { get; set; }
        public int? IsNgayTrungTuyen { get; set; }
        public bool? DungTatCa { get; set; }
        public override string? ToString()
        {
            return So + "-" + HoTen + "-" + NgaySinh + "-" + QuocTich + "-" + NoiCuTru + "-" + NgayDangKy + "-" + Hang + "-" + MoTaXeDuocSuDung + "-" + NgayTrungTuyen;
        }
        public int DuLieuId { get; set; }

        public DuLieu DuLieu { get; set; }
    }
}
