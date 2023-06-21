namespace CMS_WebDesignCore.Entities
{
    public partial class CitizenIdentification
    {
        public Guid Id { get; set; }
        public string? No { get; set; }
        public string? FullName { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Sex { get; set; }
        public string? Nationality { get; set; }
        public string? DateOfExpiry { get; set; }
        public string? PlaceOfResidence { get; set; }
        public string? PlaceOfOnigin { get; set; }
        public string? PersonalIdentitication { get; set; }
        public string? DateSupply { get; set; }
        public string? Vnm { get; set; }
        public Guid? DataId { get; set; }

        public virtual Datum? Data { get; set; }
    }
}
