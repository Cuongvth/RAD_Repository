using CMS_WebDesignCore.Enums;

namespace CMS_WebDesignCore.DTO
{
    public class GoogleIdenDTO<T>
    {
        public string? GoogleIdenData { get; set; }
        public FullInfo<T>? Result { get; set; }
        public IdenEnum Status { get; set; }
    }
}
