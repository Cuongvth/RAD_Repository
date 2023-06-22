namespace CMS_WebDesignCore.Entities
{
    public partial class DuLieu
    {
        public DuLieu()
        {
            CanCuocCongDans = new HashSet<CanCuocCongDan>();
            GiayPhepLaiXes = new HashSet<GiayPhepLaiXe>();
        }

        public int Id { get; set; }
        public byte[]? MatTruoc { get; set; }
        public byte[]? MatSau { get; set; }
        public int? Status { get; set; }

        public virtual ICollection<CanCuocCongDan> CanCuocCongDans { get; set; }
        public virtual ICollection<GiayPhepLaiXe> GiayPhepLaiXes { get; set; }
    }
}
