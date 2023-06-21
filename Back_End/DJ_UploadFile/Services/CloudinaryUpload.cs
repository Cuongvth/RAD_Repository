using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace DJ_UploadFile.Services
{
    public class CloudinaryUpload
    {
        //https://console.cloudinary.com/
        private static readonly string cloudName = "";
        private static readonly string apiKey = "";
        private static readonly string apiSecret = "";
        private static readonly Random rnd = new();
        public static
            Account account = new(cloudName, apiKey, apiSecret);
        public static Cloudinary _cloudinary = new(account);
        public static async Task<string> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("No file selected.");
            }

            using Stream stream = file.OpenReadStream();
            ImageUploadParams uploadParams = new()
            {
                File = new FileDescription(file.FileName, stream),
                PublicId = "xyz-abc" + "_" + rnd.Next() + "_" + DateTime.Now.ToShortDateString() // ID công khai tùy ý cho file
            };

            ImageUploadResult uploadResult = await CloudinaryUpload._cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                // Xử lý lỗi tải lên
                throw new Exception(uploadResult.Error.Message);
            }

            // Lấy URL công khai của file tải lên
            string imageUrl = uploadResult.SecureUrl.ToString();

            // Tiếp tục xử lý hoặc lưu thông tin về file trong cơ sở dữ liệu

            return imageUrl;
        }

    }
}
