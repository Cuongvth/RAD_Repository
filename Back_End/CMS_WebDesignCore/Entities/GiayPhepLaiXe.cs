namespace CMS_WebDesignCore.Entities
{
    public partial class GiayPhepLaiXe
    {
        public int Id { get; set; }
        public string? So { get; set; }
        public string? HoTen { get; set; }
        public string? NgaySinh { get; set; }
        public string? GioiTinh { get; set; }
        public string? Hang { get; set; }
        public string? DiaChi { get; set; }
        public string? PhuongTienDuocPhep { get; set; }
        public string? NgayTrungTuyen { get; set; }
        public string? NgayDangKi { get; set; }
        public int? DoChinhXacSo { get; set; }
        public int? DoChinhXacHoTen { get; set; }
        public int? DoChinhXacNgaySinh { get; set; }
        public int? DoChinhXacGioiTinh { get; set; }
        public int? DoChinhXacHang { get; set; }
        public int? DoChinhXacDiaChi { get; set; }
        public int? DoChinhXacPhuongTienDuocPhep { get; set; }
        public int? DoChinhXacNgayTrungTuyen { get; set; }
        public int? DoChinhXacNgayDangKi { get; set; }
        public bool? ChinhXac { get; set; }
        public int? DuLieuId { get; set; }

        public virtual DuLieu? DuLieu { get; set; }
    }
}
