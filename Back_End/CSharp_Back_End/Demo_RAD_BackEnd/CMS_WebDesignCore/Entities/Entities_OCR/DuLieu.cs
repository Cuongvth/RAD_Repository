using CMS_WebDesignCore.Enums;

namespace CMS_WebDesignCore.Entities.Entities_OCR
{
    public partial class DuLieu : BaseEntity
    {
        public byte[] MatTruoc { get; set; }
        public byte[] MatSau { get; set; }
        public string? GoogleMatTruoc { get; set; }
        public string? GoogleMatSau { get; set; }
        public int? IsMatTruoc { get; set; } = 100;
        public int? IsMatSau { get; set; } = 100;
        public bool? IsLoaiThe { get; set; } = true;
        public DateTime ThoiGianThem { get; set; }
        public DateTime? ThoiGianXacNhan { get; set; }
        public StatusData Status { get; set; }

    }
}
