using Aspose.Pdf;
using CMS_WebDesignCore.IBusiness.ComputerVisionT8;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CMS_Web.Controllers.Controllers_ComputerVision_T8
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComputerVisionT8Controller : ControllerBase
    {
        private readonly ComputerVisionT8Service _service;

        public ComputerVisionT8Controller()
        {
            _service = new ComputerVisionT8Service();
        }

        [HttpPost("convertToGif")]
        public IActionResult ConvertToGifAsync(List<IFormFile> imageUrls)
        {
            return Ok(_service.ConvertToGifAsync(imageUrls));
        }
    }
}
