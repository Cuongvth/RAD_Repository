using Microsoft.AspNetCore.Mvc;

namespace CMS_Web.Controllers
{
    [Route("admin")]
    public class AdminAPIs : BaseAPI
    {
        [HttpGet("test")]
        public async Task<IActionResult> test()
        {
            return Ok("ahihi");
        }
    }
}
