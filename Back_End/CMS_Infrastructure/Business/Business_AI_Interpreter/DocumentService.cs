using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;
using Microsoft.AspNetCore.Http;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
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

        public async Task<byte[]> DownloadConvertedDocument(List<ImageBlock> requests, string filePath)
        {
            List<string> imagePaths = BoundingPolyOnTopOfImages(requests, filePath);
            string archivePath = CreateArchive(filePath, imagePaths);

            byte[] fileBytes = await ReadAllBytesAsync(archivePath);

            DeleteFileAndDirectory(archivePath);

            return fileBytes;
        }


        public async Task<List<ImageBlock>> ConvertDocument(List<string> convertedImagePaths, string targetLanguage)
        {
            List<ImageBlock> result = new();
            foreach (string imagePath in convertedImagePaths)
            {
                string imageName = Path.GetFileName(imagePath);

                if (!File.Exists(imagePath))
                {
                    throw new ArgumentException($"Image file not found: {imageName}");
                }

                List<List<ParagraphInfo>> paragraphInfos = await GetTranslatedTextBlocks(imagePath, targetLanguage);
                ImageBlock block = new()
                {
                    ImagePath = imagePath,
                    TextAnnotations = paragraphInfos
                };
                result.Add(block);
            }
            return result;
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

            List<string> imagePaths = new();

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

            _ = Directory.CreateDirectory(folderPath);

            using (FileStream stream = new(filePath, FileMode.Create))
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
            List<string> imagePaths = requests.Select(request =>
            {
                using Bitmap image = new(request.ImagePath);
                using Graphics graphics = Graphics.FromImage(image);
                foreach (List<ParagraphInfo> textBlock in request.TextAnnotations)
                {
                    foreach (ParagraphInfo textObject in textBlock)
                    {
                        Google.Apis.Vision.v1.Data.BoundingPoly? boundingPoly = textObject.BoundingPoly;

                        if (boundingPoly.Vertices.Count < 2 || string.IsNullOrEmpty(textObject.TranslatedText))
                        {
                            continue;
                        }

                        PointF[] vertices = new PointF[]
                        {
                            new PointF((int)boundingPoly.Vertices[0].X,(int) boundingPoly.Vertices[0].Y),
                            new PointF((int)boundingPoly.Vertices[1].X, (int)boundingPoly.Vertices[0].Y),
                            new PointF((int)boundingPoly.Vertices[1].X, (int)boundingPoly.Vertices[1].Y),
                            new PointF((int)boundingPoly.Vertices[0].X, (int)boundingPoly.Vertices[1].Y)
                        };

                        GraphicsPath path = new();
                        path.AddPolygon(vertices);

                        Pen pen = new(System.Drawing.Color.Red, 1);
                        graphics.DrawPath(pen, path);

                        Color backgroundColor = System.Drawing.Color.Aqua;
                        SolidBrush brush = new(backgroundColor);
                        graphics.FillPath(brush, path);

                        Font font = new("Arial", 8, FontStyle.Bold);
                        RectangleF textRect = RectangleF.FromLTRB(
                            vertices[0].X,
                            vertices[0].Y,
                            vertices[1].X,
                            vertices[1].Y
                        );
                        graphics.DrawString(textObject.TranslatedText, font, Brushes.Black, textRect);
                    }
                }

                string imageOutputPath = Path.Combine(Path.GetDirectoryName(filePath), Path.GetFileName(request.ImagePath));
                image.Save(imageOutputPath, ImageFormat.Jpeg);

                return imageOutputPath;
            }).ToList();

            return imagePaths;
        }

        private IEnumerable<string> SplitIntoLines(IEnumerable<string> words, float maxWidth, Graphics graphics, Font font)
        {
            List<string> lines = new();

            string line = "";
            foreach (string word in words)
            {
                if (graphics.MeasureString(line + word, font).Width > maxWidth)
                {
                    lines.Add(line);
                    line = "";
                }
                line += word + " ";
            }

            if (!string.IsNullOrWhiteSpace(line))
            {
                lines.Add(line);
            }

            return lines;
        }

        private string CreateArchive(string filePath, List<string> imagePaths)
        {
            string tempFolderPath = Path.Combine(Path.GetTempPath(), "temp_folder");
            _ = Directory.CreateDirectory(tempFolderPath);

            string archivePath = Path.Combine(tempFolderPath, $"archive_{DateTime.Now:yyyyMMddHHmmss}.rar");

            using (ZipArchive archive = ZipFile.Open(archivePath, ZipArchiveMode.Create))
            {
                string folderName = filePath;
                ZipArchiveEntry folderEntry = archive.CreateEntry(folderName + "/");

                imagePaths.ForEach(imagePath =>
                {
                    string entryName = folderName + "/" + Path.GetFileName(imagePath);
                    _ = archive.CreateEntryFromFile(imagePath, entryName);
                });
            }

            return archivePath;
        }

        private async Task<byte[]> ReadAllBytesAsync(string filePath)
        {
            return await File.ReadAllBytesAsync(filePath);
        }

        private void DeleteFileAndDirectory(string filePath)
        {
            File.Delete(filePath);
            string? tempFolderPath = Path.GetDirectoryName(filePath);
            Directory.Delete(tempFolderPath, true);
        }
    }
}
