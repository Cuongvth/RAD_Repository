using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter
{
    public interface IDocumentService
    {
        Task<List<string>> UploadDocument(IFormFile documentDownload);

        Task<List<ImageBlock>> ConvertDocument(List<string> convertedImagePaths, string targetLanguage);

        Task<byte[]> DownloadConvertedDocument(List<ImageBlock> requests, string filePath);
    }
}
