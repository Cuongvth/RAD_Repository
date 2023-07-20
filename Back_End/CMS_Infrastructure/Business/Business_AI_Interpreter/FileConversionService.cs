
using Aspose.Pdf.Devices;
using AsposePdf = Aspose.Pdf.Document;
using AsposeDoc = Aspose.Words.Document;
using SaveFormatWord = Aspose.Words.SaveFormat;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;

namespace CMS_Infrastructure.Business.Business_AI_Interpreter
{
    public class FileConversionService : IFileConversionService
    {
        public List<string> ConvertDocumentToImages(string filePath)
        {
            string extension = Path.GetExtension(filePath).ToLower();

            switch (extension)
            {
                case ".pdf":
                    return ConvertPdfToImages(filePath);
                case ".doc":
                case ".docx":
                    return ConvertWordToImages(filePath);
                case ".xls":
                case ".xlsx":
                    return ConvertExcelToImages(filePath);
                case ".ppt":
                case ".pptx":
                    return ConvertPowerPointToImages(filePath);
                default:
                    throw new NotSupportedException("Unsupported file format.");
            }
        }

        private List<string> ConvertPdfToImages(string filePath)
        {
            List<string> convertedImagePaths = new List<string>();

            int pageCount;
            using (AsposePdf pdfDocument = new AsposePdf(filePath))
            {
                pageCount = pdfDocument.Pages.Count;
                JpegDevice jpegDevice = new JpegDevice();

                for (int pageIndex = 1; pageIndex <= pageCount; pageIndex++)
                {
                    string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{pageIndex}.jpg");

                    using (FileStream imageStream = new FileStream(outputImagePath, FileMode.Create))
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
            List<string> convertedImagePaths = new List<string>();

            AsposeDoc wordDocument = new AsposeDoc(filePath);

            for (int pageIndex = 0; pageIndex < wordDocument.PageCount; pageIndex++)
            {
                var extractedPage = wordDocument.ExtractPages(pageIndex, 1);
                string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{pageIndex + 1}.jpg");
                extractedPage.Save(outputImagePath, SaveFormatWord.Jpeg);
                convertedImagePaths.Add(outputImagePath);
            }

            return convertedImagePaths;
        }

        private List<string> ConvertExcelToImages(string filePath)
        {
            List<string> convertedImagePaths = new List<string>();

            //Code

            return convertedImagePaths;
        }

        private List<string> ConvertPowerPointToImages(string filePath)
        {
            List<string> convertedImagePaths = new List<string>();

            //Code

            return convertedImagePaths;
        }
    }
}
