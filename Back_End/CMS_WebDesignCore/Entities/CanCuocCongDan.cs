namespace CMS_WebDesignCore.Entities
{
    public partial class CanCuocCongDan
    {
        public Guid Id { get; set; }
        public string? So { get; set; }
        public string? HoTen { get; set; }
        public string? NgaySinh { get; set; }
        public string? GioiTinh { get; set; }
        public string? QuocTich { get; set; }
        public string? NgayHetHan { get; set; }
        public string? DiaChiThuongTru { get; set; }
        public string? QueQuan { get; set; }
        public string? DacDiemNhanDang { get; set; }
        public string? NgayCap { get; set; }
        public string? Vnm { get; set; }
        public int? DoChinhXacSo { get; set; }
        public int? DoChinhXacHoTen { get; set; }
        public int? DoChinhXacNgaySinh { get; set; }
        public int? DoChinhXacGioiTinh { get; set; }
        public int? DoChinhXacQuocTich { get; set; }
        public int? DoChinhXacNgayHetHan { get; set; }
        public int? DoChinhXacDiaChiThuongTru { get; set; }
        public int? DoChinhXacQueQuan { get; set; }
        public int? DoChinhXacDacDiemNhanDang { get; set; }
        public int? DoChinhXacNgayCap { get; set; }
        public int? DoChinhXacVnm { get; set; }
        public bool? ChinhXac { get; set; }
        public Guid? DuLieuId { get; set; }

        public virtual DuLieu? DuLieu { get; set; }
    }
}
