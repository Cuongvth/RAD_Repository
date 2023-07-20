using Microsoft.AspNetCore.Http;

namespace CMS_Infrastructure.Plugins
{
    public class FilePlugin
    {
        public static byte[] File2ByteArr(IFormFile file)
        {
            using MemoryStream memoryStream = new();
            file.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }
}
