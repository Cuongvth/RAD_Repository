using CMS_Infrastructure.Business.AdminService;
using CMS_Infrastructure.Context;
using CMS_WebDesignCore.Enums;
using CMS_WebDesignCore.IBusiness;
using CMS_WebDesignCore.Wrap;
using Microsoft.AspNetCore.Mvc;

namespace CMS_Web.Controllers
{
    [Route("admin")]
    public class AdminAPIs : BaseAPI
    {
        private readonly IAdminService _admin;
        private readonly ComputerVisionContext _context;
        public AdminAPIs()
        {
            _admin = new AdminService();
            _context = new ComputerVisionContext();
        }

        [HttpGet("getdulieu")]
        public async Task<IActionResult> GetDuLieu(int page, int pageSize)
        {
            return Ok(await _admin.GetDuLieuPage(page, pageSize));
        }
        [HttpGet("getcancuoc")]
        public async Task<IActionResult> GetCanCuoc(int page, int pageSize)
        {
            return Ok(await _admin.GetCanCuocPage(page, pageSize));
        }
        [HttpGet("getonecancuoc")]
        public async Task<IActionResult> GetOneCanCuoc(int id)
        {
            return Ok(await _admin.GetCanCuoc(id));
        }
        [HttpGet("getoneblx")]
        public async Task<IActionResult> GetOneBLX(int id)
        {
            return Ok(await _admin.GetBLX(id));
        }
        [HttpGet("getcancuoccount")]
        public async Task<IActionResult> GetCanCuocCount()
        {
            return Ok(await _admin.GetCanCuocCount());
        }
        [HttpGet("getdulieucount")]
        public async Task<IActionResult> GetDuLieuCount()
        {
            return Ok(await _admin.GetDuLieuCount());
        }
        [HttpGet("getblxcount")]
        public async Task<IActionResult> GetBLXCount()
        {
            return Ok(await _admin.GetBLXCount());
        }
        [HttpGet("getblx")]
        public async Task<IActionResult> GetBLX(int page, int pageSize)
        {
            return Ok(await _admin.GetBLXPage(page, pageSize));
        }
        [HttpPost("themdulieu")]
        public async Task<IActionResult> ThemDuLieu(IFormFile matTruoc, IFormFile matSau)
        {
            return Ok(await _admin.ThemDuLieu(matTruoc, matSau));
        }
        [HttpGet("nhandang")]
        public async Task<IActionResult> NhanDang(int duLieuId)
        {
            switch (_admin.NhanDang(duLieuId).Result.Type)
            {
                case CMS_WebDesignCore.Enums.TypeCard.CCCD:
                    return Ok(await _admin.NhanDangCCCD(duLieuId));
                case CMS_WebDesignCore.Enums.TypeCard.BLX:
                    return Ok(await _admin.NhanDangBLX(duLieuId));
                case CMS_WebDesignCore.Enums.TypeCard.UNKNOW:
                    return BadRequest("Không nhận dạng được!");
                default:
                    return BadRequest("Không nhận dạng được!");
            }
        }
        [HttpGet("danhgiadulieucccd")]
        public async Task<IActionResult> ThongTinCoChinhXacCCCD(int CCCDID, PropCCCDEnum prop, int isTrue)
        {
            return Ok(await _admin.ThongTinCoChinhXacCCCD(CCCDID, prop, isTrue));
        }
        [HttpPost("nhandangtructiep")]
        public async Task<IActionResult> NhanDangTrucTiep(IFormFile matTruoc, IFormFile matSau)
        {
            CheckResult cr = await _admin.NhanDangTrucTiep(matTruoc);
            switch (cr.Type)
            {
                case TypeCard.UNKNOW:
                    return BadRequest("Không nhận dạng được!");
                case TypeCard.CCCD:
                    return Ok(await _admin.NhanDangCCCDTrucTiep(matTruoc, matSau));
                case TypeCard.BLX:
                    return Ok(await _admin.NhanDangBLXTrucTiep(matTruoc, matSau));
                default: return BadRequest("Lỗi");
            }
        }
    }
}
