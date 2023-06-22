using CMS_Infrastructure.Business.AdminService;
using CMS_WebDesignCore.IBusiness;
using Microsoft.AspNetCore.Mvc;

namespace CMS_Web.Controllers
{
    [Route("admin")]
    public class AdminAPIs : BaseAPI
    {
        private readonly IAdminService _admin;

        public AdminAPIs()
        {
            _admin = new AdminService();
        }

        [HttpGet("test")]
        public async Task<IActionResult> test()
        {
            await _admin.fake();
            return Ok("ss");
        }
        [HttpGet("getdulieu")]
        public async Task<IActionResult> GetDuLieu(int page, int pageSize)
        {
            return Ok(await _admin.GetDuLieuPage(page,pageSize));
        }
    }
}
