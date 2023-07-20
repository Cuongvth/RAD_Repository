
using Aspose.Pdf.Devices;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;
using AsposeDoc = Aspose.Words.Document;
using AsposePdf = Aspose.Pdf.Document;
using SaveFormatWord = Aspose.Words.SaveFormat;

namespace CMS_Infrastructure.Business.Business_AI_Interpreter
{
    public class FileConversionService : IFileConversionService
    {
        public List<string> ConvertDocumentToImages(string filePath)
        {
            string extension = Path.GetExtension(filePath).ToLower();

            return extension switch
            {
                ".pdf" => ConvertPdfToImages(filePath),
                ".doc" or ".docx" => ConvertWordToImages(filePath),
                ".xls" or ".xlsx" => ConvertExcelToImages(filePath),
                ".ppt" or ".pptx" => ConvertPowerPointToImages(filePath),
                _ => throw new NotSupportedException("Unsupported file format."),
            };
        }

        private List<string> ConvertPdfToImages(string filePath)
        {
            List<string> convertedImagePaths = new();

            int pageCount;
            using (AsposePdf pdfDocument = new(filePath))
            {
                pageCount = pdfDocument.Pages.Count;
                JpegDevice jpegDevice = new();

                for (int pageIndex = 1; pageIndex <= pageCount; pageIndex++)
                {
                    string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{pageIndex}.jpg");

                    using (FileStream imageStream = new(outputImagePath, FileMode.Create))
                    {
                        jpegDevice.Process(pdfDocument.Pages[pageIndex], imageStream);
                    }

                    convertedImagePaths.Add(outputImagePath);
                }
            }

            return convertedImagePaths;
        }

        private List<string> ConvertWordToImages(string filePath)
        {
            List<string> convertedImagePaths = new();

            AsposeDoc wordDocument = new(filePath);

            for (int pageIndex = 0; pageIndex < wordDocument.PageCount; pageIndex++)
            {
                AsposeDoc extractedPage = wordDocument.ExtractPages(pageIndex, 1);
                string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{pageIndex + 1}.jpg");
                _ = extractedPage.Save(outputImagePath, SaveFormatWord.Jpeg);
                convertedImagePaths.Add(outputImagePath);
            }

            return convertedImagePaths;
        }

        private List<string> ConvertExcelToImages(string filePath)
        {
            List<string> convertedImagePaths = new();

            //Code

            return convertedImagePaths;
        }

        private List<string> ConvertPowerPointToImages(string filePath)
        {
            List<string> convertedImagePaths = new();

            //Code

            return convertedImagePaths;
        }
    }
}
