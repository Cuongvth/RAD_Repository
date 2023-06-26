using CMS_WebDesignCore.Enums;

namespace CMS_WebDesignCore.Entities
{
    public partial class DuLieu : BaseEntity
    {
        public byte[] MatTruoc { get; set; }
        public byte[] MatSau { get; set; }
        public string? GoogleMatTruoc { get; set; }
        public string? GoogleMatSau { get; set; }
        public int? IsMatTruoc { get; set; }
        public int? IsMatSau { get; set; }
        public bool? IsLoaiThe { get; set; }
        public DateTime ThoiGianThem { get; set; }
        public DateTime? ThoiGianXacNhan { get; set; }
        public StatusData Status { get; set; }
     
    }
}
