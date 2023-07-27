using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;
using Microsoft.AspNetCore.Http;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO.Compression;
using System.Text;

namespace CMS_Infrastructure.Business.Business_AI_Interpreter
{
    public class DocumentService : IDocumentService, IFileConversionService, ITextRecognitionService
    {
        private readonly IFileConversionService fileConversionService;
        private readonly TextRecognitionService textRecognitionService;

        public DocumentService(IFileConversionService fileConversionService, string visionApiKey, string translationApiKey)
        {
            this.fileConversionService = fileConversionService;
            textRecognitionService = new TextRecognitionService(visionApiKey, translationApiKey);
        }

        public byte[] GetImageBytes(string imageName)
        {
            string imagePath = imageName;
            return File.ReadAllBytes(imagePath);
        }

        public async Task<byte[]> DownloadConvertedDocument(string folderName)
        {
            string folderPath = Path.Combine("path", "images", "save", folderName);

            if (!Directory.Exists(folderPath))
            {
                throw new ArgumentException($"Folder not found: {folderName}");
            }

            string zipFilePath = Path.Combine(Path.GetTempPath(), $"{folderName}.zip");
            ZipFile.CreateFromDirectory(folderPath, zipFilePath);

            byte[] zipBytes = await File.ReadAllBytesAsync(zipFilePath);

            File.Delete(zipFilePath);

            return zipBytes;
        }

        public async Task<List<string>> ConvertDocument(List<string> convertedImagePaths, string targetLanguage, string filePath)
        {
            var tasks = convertedImagePaths.Select(imagePath => ProcessImageAsync(imagePath, targetLanguage));

            var result = await Task.WhenAll(tasks);
            var resultList = result.ToList();

            var imagePaths = BoundingPolyOnTopOfImages(resultList, filePath);

            string folderName = Path.GetFileNameWithoutExtension(filePath);
            string folderPath = Path.Combine("path", "images", "save", folderName);
            Directory.CreateDirectory(folderPath);

            var movedImagePaths = await MoveImagesAsync(imagePaths, folderPath);

            return movedImagePaths.ToList();
        }


        public async Task<List<string>> UploadDocument(IFormFile documentUpload)
        {
            if (documentUpload == null || documentUpload.Length <= 0)
            {
                throw new ArgumentException("No file found");
            }

            string fileExtension = Path.GetExtension(documentUpload.FileName).ToLower();
            if (!IsSupportedFileType(fileExtension))
            {
                throw new ArgumentException("File type not supported");
            }

            string folderPath = $"path/images/save/{documentUpload.FileName}";
            string fileName = await SaveFile(documentUpload, folderPath);
            string documentFilePath = Path.Combine(folderPath, fileName);



            List<string> convertedImagePaths = ConvertDocumentToImages(documentFilePath);
            File.Delete(documentFilePath);

            List<string> imagePaths = new List<string>();

            foreach (string imagePath in convertedImagePaths)
            {
                imagePaths.Add(imagePath);
            }

            return imagePaths;
        }

        private bool IsSupportedFileType(string fileExtension)
        {
            string[] supportedExtensions = { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx" };
            return supportedExtensions.Contains(fileExtension);
        }

        private async Task<string> SaveFile(IFormFile file, string folderPath)
        {
            string fileName = file.FileName;
            string filePath = Path.Combine(folderPath, fileName);

            Directory.CreateDirectory(folderPath);

            using (FileStream stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public List<string> ConvertDocumentToImages(string filePath)
        {
            return fileConversionService.ConvertDocumentToImages(filePath);
        }

        public async Task<List<List<ParagraphInfo>>> GetTranslatedTextBlocks(string imagePath, string targetLanguage)
        {
            return await textRecognitionService.GetTranslatedTextBlocks(imagePath, targetLanguage);
        }

        private List<string> BoundingPolyOnTopOfImages(List<ImageBlock> requests, string filePath)
        {
            var imagePaths = requests.Select(request =>
            {
                using (var image = new Bitmap(request.ImagePath))
                using (var graphics = Graphics.FromImage(image))
                {
                    image.SetResolution(300, 300);

                    // Use anti-aliasing and high-quality text rendering
                    graphics.SmoothingMode = SmoothingMode.AntiAlias;
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    graphics.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                    foreach (var textBlock in request.TextAnnotations)
                    {
                        foreach (var textObject in textBlock)
                        {
                            var boundingPoly = textObject.BoundingPoly;

                            if (boundingPoly.Vertices.Count < 2 || string.IsNullOrEmpty(textObject.TranslatedText))
                                continue;

                            var minX = boundingPoly.Vertices.Min(v => v.X);
                            var minY = boundingPoly.Vertices.Min(v => v.Y);
                            var maxX = boundingPoly.Vertices.Max(v => v.X);
                            var maxY = boundingPoly.Vertices.Max(v => v.Y);

                            var textRect = RectangleF.FromLTRB((int)minX, (int)minY, (int)maxX, (int)maxY);

                            var fontSizeToFitHeight = CalculateFontSizeToFitText(textRect, graphics, textObject.TranslatedText, "Arial");
                            var font = new Font("Arial", fontSizeToFitHeight, FontStyle.Bold);

                            var textSize = graphics.MeasureString(textObject.TranslatedText, font);
                            var textTop = (textRect.Y + textRect.Height) - textSize.Height;
                            if (textTop < maxY)
                            {
                                textRect.Height += (int)maxY - textTop;
                            }

                            var path = new GraphicsPath();
                            path.AddRectangle(textRect);

                            var pen = new Pen(Color.Red, 1);
                            graphics.DrawPath(pen, path);

                            var backgroundColor = Color.Aqua;
                            var brush = new SolidBrush(backgroundColor);
                            graphics.FillPath(brush, path);

                            graphics.DrawString(textObject.TranslatedText, font, Brushes.Black, textRect);
                        }
                    }

                    var imageOutputPath = Path.Combine(Path.GetDirectoryName(filePath), Path.GetFileName(request.ImagePath));
                    image.Save(imageOutputPath, ImageFormat.Jpeg);
                    return imageOutputPath;
                }
            }).ToList();

            return imagePaths;
        }

        private int CalculateFontSizeToFitText(RectangleF textRect, Graphics graphics, string text, string fontName)
        {
            int fontSize = 6;
            Font font;
            int maxFontSize = 100;

            do
            {
                font = new Font(fontName, fontSize);
                var lines = GetTextLines(graphics, text, font, textRect.Width);
                var totalTextHeight = lines.Sum(line => graphics.MeasureString(line, font).Height);

                if (totalTextHeight <= textRect.Height)
                {
                    fontSize++;
                }
                else
                {
                    font.Dispose();
                    break;
                }
            } while (fontSize <= maxFontSize);

            return fontSize - 1;
        }

        private List<string> GetTextLines(Graphics graphics, string text, Font font, float maxWidth)
        {
            var lines = new List<string>();
            var words = text.Split(' ');

            var currentLine = new StringBuilder();
            foreach (var word in words)
            {
                var currentLineWithWord = currentLine.Length == 0 ? word : $"{currentLine} {word}";
                var wordSize = graphics.MeasureString(currentLineWithWord, font);

                if (wordSize.Width <= maxWidth)
                {
                    currentLine.Append(word).Append(" ");
                }
                else
                {
                    lines.Add(currentLine.ToString().TrimEnd());
                    currentLine = new StringBuilder(word);
                }
            }

            if (currentLine.Length > 0)
            {
                lines.Add(currentLine.ToString().TrimEnd());
            }

            return lines;
        }

        private async Task<ImageBlock> ProcessImageAsync(string imagePath, string targetLanguage)
        {
            string imageName = Path.GetFileName(imagePath);

            if (!File.Exists(imagePath))
            {
                throw new ArgumentException($"Image file not found: {imageName}");
            }

            List<List<ParagraphInfo>> paragraphInfos = await GetTranslatedTextBlocks(imagePath, targetLanguage);

            return new ImageBlock
            {
                ImagePath = imagePath,
                TextAnnotations = paragraphInfos
            };
        }


        private async Task<List<string>> MoveImagesAsync(List<string> imagePaths, string destinationFolder)
        {
            var moveTasks = imagePaths.Select(async imagePath =>
            {
                string imageFileName = Path.GetFileName(imagePath);
                string destinationPath = Path.Combine(destinationFolder, imageFileName);

                if (File.Exists(destinationPath))
                {
                    File.Delete(destinationPath);
                }

                await Task.Run(() => File.Move(imagePath, destinationPath));

                return destinationPath;
            });

            var movedImagePaths = await Task.WhenAll(moveTasks);

            return movedImagePaths.ToList();
        }
    }

}
