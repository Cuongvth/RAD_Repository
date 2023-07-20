using CMS_WebDesignCore.Enums;
using CMS_WebDesignCore.Wrap;
using Google.Apis.Services;
using Google.Apis.Vision.v1;
using AnnotateImageRequest = Google.Apis.Vision.v1.Data.AnnotateImageRequest;
using BatchAnnotateImagesRequest = Google.Apis.Vision.v1.Data.BatchAnnotateImagesRequest;
using Feature = Google.Apis.Vision.v1.Data.Feature;
using Image = Google.Apis.Vision.v1.Data.Image;

namespace CMS_Infrastructure.Business.Business_OCR.APINhanDien
{
    public class GoogleVisionAPI
    {
        public static string[] LayThongTinTrenThe(string data)
        {
            // Thay thế "your-api-key" bằng API key của bạn
            string apiKey = "AIzaSyCR6UzC-4bo0gHXR419CPQoi2GQM0tldNY";

            BaseClientService.Initializer credential = new()
            {
                ApiKey = apiKey,
            };

            VisionService service = new(credential);

            // Sử dụng service để gọi các phương thức của API Vision
            // Trong phần Main của chương trình
            Image image = new()
            {
                Content = data
            };

            Feature feature = new()
            {
                Type = "TEXT_DETECTION" // Loại tính năng: phát hiện văn bản
            };

            AnnotateImageRequest request = new()
            {
                Image = image,
                Features = new[] { feature }
            };
            BatchAnnotateImagesRequest batchRequest = new()
            {
                Requests = new[] { request }
            };

            Google.Apis.Vision.v1.Data.BatchAnnotateImagesResponse response = service.Images.Annotate(batchRequest).Execute();

            // Xử lý response để trích xuất kết quả
            IList<Google.Apis.Vision.v1.Data.EntityAnnotation> textAnnotations = response.Responses[0].TextAnnotations;
            string[] result = new string[textAnnotations.Count];
            int i = 0;
            foreach (Google.Apis.Vision.v1.Data.EntityAnnotation? annotation in textAnnotations)
            {
                result[i] = annotation.Description;
                i++;
            }
            return result[0].Split("\n");
        }
        public static CheckResult NhanDangThe(string data)
        {
            string[] dataRender = LayThongTinTrenThe(data);
            for (int i = 0; i < dataRender.Length; i++)
            {
                if (dataRender[i].Contains("CĂN CƯỚC CÔNG DÂN") || dataRender[i].Contains("GIẤY CHỨNG MINH NHÂN DÂN") || dataRender[i].Contains("CHỨNG MINH NHÂN DÂN"))
                {
                    return new CheckResult()
                    {
                        Type = TypeCard.CCCD,
                        Data = dataRender
                    };
                }
                if (dataRender[i].Contains("DRIVER'S LICENSE") || dataRender[i].Contains("GIẤY PHÉP LÁI XE"))
                {
                    return new CheckResult()
                    {
                        Type = TypeCard.BLX,
                        Data = dataRender
                    };
                }
            }
            return new CheckResult()
            {
                Type = TypeCard.UNKNOW,
                Data = null
            };
        }
    }
}
