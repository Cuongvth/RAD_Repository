using DJ_UploadFile.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace DJ_UploadFile
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {

            string filePath = "C:\\Users\\Admin\\Documents\\GitHub\\Thai-Lan-Huong\\dj-client\\src\\assets\\github.png";

            // Đọc nội dung file thành một mảng byte
            byte[] fileBytes = File.ReadAllBytes(filePath);

            // Tạo đối tượng IFormFile từ mảng byte và thông tin về tên file, kiểu MIME
            IFormFile formFile = new FormFile(new MemoryStream(fileBytes), 0, fileBytes.Length, null, Path.GetFileName(filePath));
            Console.WriteLine(await CloudinaryUpload.UploadFile(formFile));
        }
    }
}