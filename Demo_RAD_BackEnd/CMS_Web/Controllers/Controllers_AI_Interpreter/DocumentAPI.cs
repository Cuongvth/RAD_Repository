using CMS_Infrastructure.Business.Business_AI_Interpreter;
using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using Microsoft.AspNetCore.Mvc;


namespace CMS_Web.Controllers.Controllers_AI_Interpreter
{
    [Route("api/[controller]")]
    public class DocumentAPI : BaseAPI
    {
        private readonly DocumentService _documentService;
        private readonly string visionApiKey = "AIzaSyCR6UzC-4bo0gHXR419CPQoi2GQM0tldNY";
        private readonly string translationApiKey = "AIzaSyDCDe1LIEp6mxsxYIfPDjmd4u_z5BmdIoU";

        public DocumentAPI()
        {
            _documentService = new DocumentService(new FileConversionService(), visionApiKey, translationApiKey);

        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument(IFormFile documentUpload)
        {
            try
            {
                List<string> imagePaths = await _documentService.UploadDocument(documentUpload);
                return Ok(imagePaths);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("convert")]
        public async Task<IActionResult> ConvertDocument(List<string> convertedImagePaths, string targetLanguage)
        {
            try
            {
                List<ImageBlock> imageBlocks = await _documentService.ConvertDocument(convertedImagePaths, targetLanguage);
                return Ok(imageBlocks);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("download")]
        [RequestSizeLimit(1000_000_000)]
        public async Task<IActionResult> DownloadDocument([FromBody] List<ImageBlock> requests, string filePath)
        {
            var fileBytes = await _documentService.DownloadConvertedDocument(requests, filePath);
            return new FileContentResult(fileBytes, "application/octet-stream")
            {
                FileDownloadName = $"{filePath}.rar"
            };
        }

    }
}
