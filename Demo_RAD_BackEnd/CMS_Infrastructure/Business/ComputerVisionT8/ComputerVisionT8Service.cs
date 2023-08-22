using CMS_WebDesignCore.Enums;
using ImageMagick;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.IBusiness.ComputerVisionT8
{
    public class ComputerVisionT8Service : IComputerVisionT8Service
    {
        public string ConvertToGifAsync(List<IFormFile> imageFiles)
        {
            try
            {
                var images = new List<MagickImage>();

                foreach (var imageFile in imageFiles)
                {
                    using (var stream = imageFile.OpenReadStream())
                    {
                        images.Add(new MagickImage(stream));
                    }
                }

                using (var gifStream = new MemoryStream())
                {
                    using (var gif = new MagickImageCollection())
                    {
                        foreach (var image in images)
                        {
                            image.AnimationDelay = 50;

                            gif.Add(image);
                        }

                        gif.Write(gifStream, MagickFormat.Gif);
                    }

                    return Convert.ToBase64String( gifStream.ToArray());
                }
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
