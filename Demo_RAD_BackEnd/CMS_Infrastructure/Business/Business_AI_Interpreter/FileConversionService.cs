
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

            return extension switch
            {
                ".pdf" => ConvertPdfToImages(filePath),
                ".doc" or ".docx" => ConvertWordToImages(filePath),
                ".xls" or ".xlsx" => ConvertExcelToImages(filePath),
                ".ppt" or ".pptx" => ConvertPowerPointToImages(filePath),
                _ => throw new NotSupportedException("Unsupported file format.")
            };
        }


        private List<string> ConvertPdfToImages(string filePath)
        {
            using (var pdfDocument = new AsposePdf(filePath))
            {
                var jpegDevice = new JpegDevice(new Resolution(300));

                return Enumerable.Range(1, pdfDocument.Pages.Count)
                    .Select(pageIndex =>
                    {
                        var outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{pageIndex}.jpg");
                        using (var imageStream = new FileStream(outputImagePath, FileMode.Create))
                            jpegDevice.Process(pdfDocument.Pages[pageIndex], imageStream);
                        return outputImagePath;
                    })
                    .ToList();
            }
        }

        private List<string> ConvertWordToImages(string filePath)
        {
            AsposeDoc wordDocument = new AsposeDoc(filePath);

            return Enumerable.Range(0, wordDocument.PageCount)
                .Select(pageIndex =>
                {
                    var extractedPage = wordDocument.ExtractPages(pageIndex, 1);
                    string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{pageIndex + 1}.jpg");
                    extractedPage.Save(outputImagePath, SaveFormatWord.Jpeg);
                    return outputImagePath;
                })
                .ToList();
        }

        private List<string> ConvertExcelToImages(string filePath)
        {
            using (Workbook workbook = new Workbook(filePath))
            {
                return Enumerable.Range(0, workbook.Worksheets.Count)
                    .SelectMany(i => Enumerable.Range(0, new SheetRender(workbook.Worksheets[i], new ImageOrPrintOptions { HorizontalResolution = 300, VerticalResolution = 300 }).PageCount)
                        .Select(j =>
                        {
                            string imagePath = Path.Combine(Path.GetDirectoryName(filePath), $"worksheet{i + 1}_{j + 1}.jpg");
                            new SheetRender(workbook.Worksheets[i], new ImageOrPrintOptions { HorizontalResolution = 300, VerticalResolution = 300 }).ToImage(j, imagePath);
                            return imagePath;
                        }))
                    .ToList();
            }
        }

        private List<string> ConvertPowerPointToImages(string filePath)
        {
            using (Presentation powerPointPresentation = new Presentation(filePath))
            {
                float dpi = 700;
                float scaleX = dpi / 96;
                float scaleY = dpi / 96;

                List<string> convertedImagePaths = powerPointPresentation.Slides
                    .Select((slide, index) =>
                    {
                        Bitmap bmp = slide.GetThumbnail(scaleX, scaleY);
                        string outputImagePath = Path.Combine(Path.GetDirectoryName(filePath), $"{slide.SlideNumber}.jpg");
                        bmp.Save(outputImagePath, System.Drawing.Imaging.ImageFormat.Jpeg);
                        return outputImagePath;
                    })
                    .ToList();

                return convertedImagePaths;
            }
        }
    }
}
