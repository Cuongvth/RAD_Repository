namespace CMS_WebDesignCore.Entities
{
    public partial class DrivingLicense
    {
        public Guid Id { get; set; }
        public string? No { get; set; }
        public string? FullName { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Nationality { get; set; }
        public string? Class { get; set; }
        public string? Address { get; set; }
        public string? VehiclesAllowedToDrive { get; set; }
        public string? BeginningDate { get; set; }
        public string? DateSupply { get; set; }
        public Guid? DataId { get; set; }

        public virtual Datum? Data { get; set; }
    }
}
