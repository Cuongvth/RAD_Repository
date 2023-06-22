using CMS_WebDesignCore.Enums;
using Google.Apis.Vision.v1;
using Google.Apis.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Image = Google.Apis.Vision.v1.Data.Image;
using ImageSource = Google.Apis.Vision.v1.Data.ImageSource;
using Feature = Google.Apis.Vision.v1.Data.Feature;
using AnnotateImageRequest = Google.Apis.Vision.v1.Data.AnnotateImageRequest;
using BatchAnnotateImagesRequest = Google.Apis.Vision.v1.Data.BatchAnnotateImagesRequest;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using CMS_WebDesignCore.Wrap;

namespace CMS_Infrastructure.Business.APINhanDien
{
    public class GoogleVisionAPI
    {
        public static string[] LayThongTinTrenThe(string data)
        {
            // Thay thế "your-api-key" bằng API key của bạn
            var apiKey = "AIzaSyCR6UzC-4bo0gHXR419CPQoi2GQM0tldNY";

            var credential = new BaseClientService.Initializer
            {
                ApiKey = apiKey,
            };

            var service = new VisionService(credential);

            // Sử dụng service để gọi các phương thức của API Vision
            // Trong phần Main của chương trình
            var image = new Image
            {
                Content = data
            };

            var feature = new Feature
            {
                Type = "TEXT_DETECTION" // Loại tính năng: phát hiện văn bản
            };

            var request = new AnnotateImageRequest
            {
                Image = image,
                Features = new[] { feature }
            };
            var batchRequest = new BatchAnnotateImagesRequest
            {
                Requests = new[] { request }
            };

            var response = service.Images.Annotate(batchRequest).Execute();

            // Xử lý response để trích xuất kết quả
            var textAnnotations = response.Responses[0].TextAnnotations;
            string[] result = new string[textAnnotations.Count];
            int i = 0;
            foreach (var annotation in textAnnotations)
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
