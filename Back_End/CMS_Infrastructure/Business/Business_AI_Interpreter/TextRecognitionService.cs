using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter;
using Google.Apis.Services;
using Google.Apis.Vision.v1;
using Google.Apis.Vision.v1.Data;
using System.Text.RegularExpressions;
using ImageGoogleVision = Google.Apis.Vision.v1.Data.Image;

namespace CMS_Infrastructure.Business.Business_AI_Interpreter
{
    public class TextRecognitionService : ITextRecognitionService, ITranslationService
    {
        private readonly string visionApiKey;
        private readonly TranslationService translationService;

        public TextRecognitionService(string visionApiKey, string translationApiKey)
        {
            this.visionApiKey = visionApiKey;
            translationService = new TranslationService(translationApiKey);
        }

        public async Task<List<List<ParagraphInfo>>> GetTranslatedTextBlocks(string imagePath, string targetLanguage)
        {
            BaseClientService.Initializer credential = new() { ApiKey = visionApiKey };
            VisionService service = new(credential);

            ImageGoogleVision image = ReadImageFromFile(imagePath);
            TextAnnotation fullTextAnnotation = PerformTextDetection(service, image);
            List<List<ParagraphInfo>> textBlocks = ExtractTextBlocks(fullTextAnnotation);
            await TranslateTextBlocks(textBlocks, targetLanguage);

            return textBlocks;
        }

        private ImageGoogleVision ReadImageFromFile(string imagePath)
        {
            byte[] data = File.ReadAllBytes(imagePath);
            return new ImageGoogleVision { Content = Convert.ToBase64String(data) };
        }

        private TextAnnotation PerformTextDetection(VisionService service, ImageGoogleVision image)
        {
            Feature feature = new() { Type = "TEXT_DETECTION" };
            AnnotateImageRequest request = new() { Image = image, Features = new[] { feature } };
            BatchAnnotateImagesRequest batchRequest = new() { Requests = new[] { request } };

            BatchAnnotateImagesResponse response = service.Images.Annotate(batchRequest).Execute();
            return response.Responses[0].FullTextAnnotation;
        }

        private List<List<ParagraphInfo>> ExtractTextBlocks(TextAnnotation fullTextAnnotation)
        {
            List<string> textsToRemove = new()
            {
                "Evaluation Only . Created with Aspose.Words . Copyright 2003-2023 Aspose Pty Ltd. ",
                "Evaluation Only . Created with Aspose.Words . Copyright 2003-2023 Aspose Pty Ltd.",
                "Your File Format APIs",
                "SASPOSE",
                "Created with an evaluation copy of Aspose . Words . To discover the full versions of our APIs please visit : https://products.aspose.com/words/",
                "Evaluation Only . Created with Aspose . Words . Copyright 2003-2023 Aspose Pty Ltd.",
            };

            return fullTextAnnotation.Pages
                .SelectMany(page => page.Blocks)
                .Select(block => block.Paragraphs
                    .Select(paragraph =>
                    {
                        string paragraphText = string.Join(" ", paragraph.Words.Select(word => string.Join("", word.Symbols.Select(symbol => symbol.Text)))).Trim();
                        IEnumerable<Vertex> boundingPolyVertices = paragraph.Words.SelectMany(word => word.Symbols).SelectMany(symbol => symbol.BoundingBox.Vertices);

                        BoundingPoly boundingPoly = new()
                        {
                            Vertices = new List<Vertex>
                            {
                        new Vertex
                        {
                            X = boundingPolyVertices.Min(v => v.X),
                            Y = boundingPolyVertices.Min(v => v.Y)
                        },
                        new Vertex
                        {
                            X = boundingPolyVertices.Max(v => v.X),
                            Y = boundingPolyVertices.Max(v => v.Y)
                        }
                            }
                        };

                        paragraphText = textsToRemove.Aggregate(paragraphText, (current, textToRemove) => current.Trim().Replace(textToRemove, ""));

                        return new ParagraphInfo
                        {
                            Text = Regex.Replace(paragraphText, @"\s+", " "),
                            BoundingPoly = boundingPoly
                        };
                    })
                    .ToList())
                .ToList();
        }




        private async Task TranslateTextBlocks(List<List<ParagraphInfo>> textBlocks, string targetLanguage)
        {
            List<string?> paragraphs = textBlocks.SelectMany(block => block.Select(p => p.Text)).ToList();
            List<string> translatedTexts = await TranslateText(paragraphs, targetLanguage);

            int index = 0;
            textBlocks.ForEach(block => block.ForEach(paragraph => paragraph.TranslatedText = translatedTexts[index++]));
        }

        public async Task<List<string>> TranslateText(List<string> texts, string targetLanguage)
        {
            return await translationService.TranslateText(texts, targetLanguage);
        }
    }


}
