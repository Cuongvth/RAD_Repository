using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.IBusiness.ComputerVisionT8
{
    public interface IComputerVisionT8Service
    {
         string ConvertToGifAsync(List<IFormFile> imageFiles);
    }
}
