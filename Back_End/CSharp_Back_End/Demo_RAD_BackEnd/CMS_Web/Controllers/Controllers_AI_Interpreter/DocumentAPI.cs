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
        [RequestSizeLimit(1000_000_000)]
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
        public async Task<IActionResult> ConvertDocument(List<string> convertedImagePaths, string targetLanguage, string filePath)
        {
            try
            {
                List<string> convertedImages = await _documentService.ConvertDocument(convertedImagePaths, targetLanguage, filePath);
                return Ok(convertedImages);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpGet("download/{folderName}")]
        public async Task<IActionResult> DownloadDocument(string folderName)
        {
            try
            {
                byte[] zipBytes = await _documentService.DownloadConvertedDocument(folderName);

                if (zipBytes == null)
                {
                    return NotFound();
                }

                return File(zipBytes, "application/zip", $"{folderName}.zip");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("images/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            try
            {
                byte[] imageBytes = _documentService.GetImageBytes(imageName);
                return File(imageBytes, "image/jpeg");
            }
            catch (Exception)
            {
                return NotFound();
            }
        }


    }
}
