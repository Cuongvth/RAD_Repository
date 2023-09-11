using CMS_WebDesignCore.Enums;

namespace CMS_WebDesignCore.DTO
{
    public class FullInfo<T>
    {
        public T Data { get; set; }
        public TypeCard Type { get; set; }
        public string[] GoogleMatTruoc { get; set; }
        public string[] GoogleMatSau { get; set; }
    }
}
