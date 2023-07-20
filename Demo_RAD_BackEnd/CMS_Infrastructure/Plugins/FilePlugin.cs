using Microsoft.AspNetCore.Http;

namespace CMS_Infrastructure.Plugins
{
    public class FilePlugin
    {
        public static byte[] File2ByteArr(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
