using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;
using Microsoft.AspNetCore.Http;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO.Compression;

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
            var imagePaths = requests.Select(request => ProcessImageBlock(request, filePath)).ToList();
            return imagePaths;
        }

        private string ProcessImageBlock(ImageBlock request, string filePath)
        {
            var outputPath = Path.Combine(Path.GetDirectoryName(filePath), Path.GetFileName(request.ImagePath));
            using (var image = new Bitmap(request.ImagePath))
            using (var graphics = Graphics.FromImage(image))
            {
                image.SetResolution(300, 300);
                ConfigureGraphics(graphics);

                var textObjects = request.TextAnnotations
                    .SelectMany(textBlock => textBlock)
                    .Where(textObject => textObject.BoundingPoly.Vertices.Count >= 2 && !string.IsNullOrEmpty(textObject.TranslatedText));

                foreach (var textObject in textObjects)
                {
                    ProcessTextObject(textObject, graphics);
                }

                image.Save(outputPath, ImageFormat.Jpeg);
            }
            return outputPath;
        }

        private void ConfigureGraphics(Graphics graphics)
        {
            // Use anti-aliasing and high-quality text rendering
            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
            graphics.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;
        }

        private void ProcessTextObject(ParagraphInfo textObject, Graphics graphics)
        {
            var boundingPoly = textObject.BoundingPoly;
            var vertices = boundingPoly.Vertices;

            var (minX, minY) = (vertices.Min(v => v.X), vertices.Min(v => v.Y));
            var (maxX, maxY) = (vertices.Max(v => v.X), vertices.Max(v => v.Y));

            var textRect = RectangleF.FromLTRB((int)minX, (int)minY, (int)maxX, (int)maxY);

            var fontSizeToFitHeight = CalculateFontSizeToFitText(textRect, graphics, textObject.TranslatedText, "Arial");
            var font = new Font("Arial", fontSizeToFitHeight, FontStyle.Bold);

            var words = textObject.TranslatedText.Split(' ');
            var isSingleWord = words.Length == 1;

            if (isSingleWord)
            {
                var wordSize = graphics.MeasureString(textObject.TranslatedText, font);
                textRect.Width = wordSize.Width;

                var fontSizeToFitWidth = CalculateFontSizeToFitText(textRect, graphics, textObject.TranslatedText, "Arial");
                while (textRect.Width >= maxY && fontSizeToFitWidth > 6)
                {
                    fontSizeToFitWidth--;
                    font = new Font("Arial", fontSizeToFitWidth, FontStyle.Bold);
                    wordSize = graphics.MeasureString(textObject.TranslatedText, font);
                    textRect.Width = wordSize.Width;
                }
            }
            else
            {
                var lines = GetTextLines(graphics, textObject.TranslatedText, font, textRect.Width);
                var lineHeight = graphics.MeasureString("A", font).Height;
                var newHeight = lineHeight * lines.Count;

                textRect.Height += (int)((textRect.Y + newHeight - maxY) ?? 0);

                var maxFontSize = 100;
                fontSizeToFitHeight = Math.Min(fontSizeToFitHeight, maxFontSize);
                font = new Font("Arial", fontSizeToFitHeight, FontStyle.Bold);
            }

            graphics.DrawRectangle(new Pen(Color.Red, 1), textRect);
            graphics.FillRectangle(new SolidBrush(Color.Aqua), textRect);
            graphics.DrawString(textObject.TranslatedText, font, Brushes.Black, textRect);
        }


        private int CalculateFontSizeToFitText(RectangleF textRect, Graphics graphics, string text, string fontName)
        {
            int fontSize = (int)(Enumerable.Range(6, 95)
                .Select(size => new Font(fontName, size))
                .FirstOrDefault(font =>
                {
                    var lines = GetTextLines(graphics, text, font, textRect.Width);
                    var totalTextHeight = lines.Sum(line => graphics.MeasureString(line, font).Height);
                    return totalTextHeight > textRect.Height;
                })?.Size ?? 100);

            return fontSize - 1;
        }

        private List<string> GetTextLines(Graphics graphics, string text, Font font, float maxWidth)
        {
            return text.Split(' ').Aggregate(new List<string>(), (lines, word) =>
            {
                string currentLine = lines.LastOrDefault() ?? "";
                string currentLineWithWord = currentLine + (currentLine != "" ? " " : "") + word;
                float wordWidth = graphics.MeasureString(currentLineWithWord, font).Width;

                if (!string.IsNullOrEmpty(currentLine) && wordWidth <= maxWidth)
                    lines[lines.Count - 1] = currentLineWithWord;
                else
                    lines.Add(word);

                return lines;
            });
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
                string destinationPath = Path.Combine(destinationFolder, Path.GetFileName(imagePath));

                if (File.Exists(destinationPath))
                    File.Delete(destinationPath);

                await Task.Run(() => File.Move(imagePath, destinationPath));

                return destinationPath;
            });

            var movedImagePaths = await Task.WhenAll(moveTasks);

            return movedImagePaths.ToList();
        }

    }

}
