using CMS_WebDesignCore.Enums;

namespace CMS_WebDesignCore.Entities
{
    public partial class DuLieu : BaseEntity
    {
        public byte[] MatTruoc { get; set; }
        public byte[] MatSau { get; set; }
        public DateTime ThoiGianThem { get; set; }
        public DateTime? ThoiGianXacNhan { get; set; }
        public StatusData Status { get; set; }
     
    }
}
