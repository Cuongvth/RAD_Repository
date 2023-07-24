using CMS_Infrastructure.Business.Business_OCR.AdminService;
using CMS_Infrastructure.Context;
using CMS_WebDesignCore.Enums;
using CMS_WebDesignCore.IBusiness.IBusiness_OCR;
using CMS_WebDesignCore.Wrap;
using Microsoft.AspNetCore.Mvc;

namespace CMS_Web.Controllers.Controllers_OCR
{
    [Route("api/[controller]")]
    public class OCRAPI : BaseAPI
    {
        private readonly IAdminService _admin;
        private readonly ComputerVisionContext _context;
        public OCRAPI()
        {
            _admin = new OCRService();
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
                case TypeCard.CCCD:
                    return Ok(await _admin.NhanDangCCCD(duLieuId));
                case TypeCard.BLX:
                    return Ok(await _admin.NhanDangBLX(duLieuId));
                case TypeCard.UNKNOW:
                    return BadRequest("Không nhận dạng được!");
                default:
                    return BadRequest("Không nhận dạng được!");
            }
        }
        [HttpGet("danhgiadulieucccd")]
        public async Task<IActionResult> ThongTinCoChinhXacCCCD(int CCCDID, int isSo, int isHoTen, int isCoGiaTriDen, int isNgayThang, int isGioiTinh, int isQuocTich, int isQueQuan, int isvnm, int isNoiThuongTru, int isDacDien, int isNgayDangKi, int isMatTruoc, int isMatSau, bool isLoaiThe)
        {
            return Ok(await _admin.ThongTinCoChinhXacCCCD(CCCDID, isSo, isHoTen, isCoGiaTriDen, isNgayThang, isGioiTinh, isQuocTich, isQueQuan, isvnm, isNoiThuongTru, isDacDien, isNgayDangKi, isMatTruoc, isMatSau, isLoaiThe));
        }
        [HttpGet("danhgiadulieublx")]
        public async Task<IActionResult> ThongTinCoChinhXacBLX(int BLXID, int isSo, int isHoTen, int isNoiCuTru, int isNgayThang, int isQuocTich, int isHang, int isMoTaXeDuocSuDung, int isNgayTrungTuyen, int isNgayDangKi, int isMatTruoc, int isMatSau, bool isLoaiThe)
        {
            return Ok(await _admin.ThongTinCoChinhXacBLX(BLXID, isSo, isHoTen, isNoiCuTru, isNgayThang, isQuocTich, isHang, isMoTaXeDuocSuDung, isNgayTrungTuyen, isNgayDangKi, isMatTruoc, isMatSau, isLoaiThe));
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
