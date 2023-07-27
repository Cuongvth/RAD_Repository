
using Aspose.Cells;
using Aspose.Cells.Rendering;
using Aspose.Pdf.Devices;
using Aspose.Slides;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;
using System.Drawing;
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

                Resolution resolution = new Resolution(300);
                JpegDevice jpegDevice = new JpegDevice(resolution);

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

            using (Workbook workbook = new Workbook(filePath))
            {
                for (int i = 0; i < workbook.Worksheets.Count; i++)
                {
                    Worksheet worksheet = workbook.Worksheets[i];
                    string imagePathTemplate = Path.Combine(Path.GetDirectoryName(filePath), $"worksheet{i + 1}_{{0}}.jpg");

                    ImageOrPrintOptions imgOptions = new ImageOrPrintOptions();
                    imgOptions.HorizontalResolution = 300;
                    imgOptions.VerticalResolution = 300;

                    SheetRender sr = new SheetRender(worksheet, imgOptions);

                    for (int j = 0; j < sr.PageCount; j++)
                    {
                        string imagePath = string.Format(imagePathTemplate, j + 1);
                        sr.ToImage(j, imagePath);
                        convertedImagePaths.Add(imagePath);
                    }
                }
            }

            return convertedImagePaths;
        }

        private List<string> ConvertPowerPointToImages(string filePath)
        {
            List<string> convertedImagePaths = new List<string>();

            using (Presentation powerPointPresentation = new Presentation(filePath))
            {
                for (int slideIndex = 0; slideIndex < powerPointPresentation.Slides.Count; slideIndex++)
                {
                    ISlide slide = powerPointPresentation.Slides[slideIndex];

                    float dpi = 300;
                    float scaleX = dpi / 96;
                    float scaleY = dpi / 96;

                    Bitmap bmp = slide.GetThumbnail(scaleX, scaleY);

                    string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{slide.SlideNumber}.jpg");
                    bmp.Save(outputImagePath, System.Drawing.Imaging.ImageFormat.Jpeg);

                    convertedImagePaths.Add(outputImagePath);
                }
            }

            return convertedImagePaths;
        }
    }
}
