namespace CMS_WebDesignCore.Entities
{
    public partial class Datum
    {
        public Datum()
        {
            CitizenIdentifications = new HashSet<CitizenIdentification>();
            DrivingLicenses = new HashSet<DrivingLicense>();
        }

        public Guid Id { get; set; }
        public byte[]? Front { get; set; }
        public byte[]? Back { get; set; }
        public string? Content { get; set; }
        public int? Status { get; set; }

        public virtual ICollection<CitizenIdentification> CitizenIdentifications { get; set; }
        public virtual ICollection<DrivingLicense> DrivingLicenses { get; set; }
    }
}
