namespace CMS_WebDesignCore.AuthModel
{
    public class AuthDataRespon
    {
        public int id { get; set; }
        //   public byte[] avatar { get; set; }
        public TokenModel Token { get; set; } = null!;
        public string email { get; set; } = null!;
        public string name { get; set; } = null!;
        public string nickName { get; set; } = null!;
        public int role { get; set; }
    }
}
