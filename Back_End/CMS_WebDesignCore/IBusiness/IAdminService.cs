using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities;
using CMS_WebDesignCore.Enums;
using CMS_WebDesignCore.Wrap;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.IBusiness
{
    public interface IAdminService
    {

        Task<IQueryable<CanCuocCongDan>> GetCanCuocPage(int page, int pageSize);
        Task<IQueryable<DuLieu>> GetDuLieuPage(int page, int pageSize);
        Task<IQueryable<GiayPhepLaiXe>> GetBLXPage(int page, int pageSize);
        Task<ActionStatus> ThemDuLieu(IFormFile matTruoc, IFormFile matSau);
        Task<GoogleIdenDTO<CanCuocCongDan>> NhanDangCCCD(int duLieuId);
        Task<GoogleIdenDTO<GiayPhepLaiXe>> NhanDangBLX(int duLieuId);
        Task<CheckResult> NhanDang(int duLieuId);
        Task<ActionStatus> ThongTinCoChinhXacCCCD(int CCCDID, PropCCCDEnum prop, bool isTrue);
        Task<GoogleIdenDTO<CanCuocCongDan>> NhanDangCCCDTrucTiep(IFormFile matTruoc, IFormFile matSau);
        Task<GoogleIdenDTO<GiayPhepLaiXe>> NhanDangBLXTrucTiep(IFormFile matTruoc, IFormFile matSau);
        Task<CheckResult> NhanDangTrucTiep(IFormFile matTruoc);
        Task fake();
    }
}
