using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using Microsoft.AspNetCore.Http;

namespace CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter
{
    public interface IDocumentService
    {
        Task<List<string>> UploadDocument(IFormFile documentDownload);

        Task<List<string>> ConvertDocument(List<string> convertedImagePaths, string targetLanguage, string filePath);

        Task<byte[]> DownloadConvertedDocument(string folderName);

        byte[] GetImageBytes(string imageName);

    }
}
