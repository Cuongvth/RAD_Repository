namespace CMS_WebDesignCore.AuthModel
{
    public class LoginResponse<T>
    {
        public int Success { get; set; }
        public string Message { get; set; } = null!;
        public T? Data { get; set; }
    }
}
