using CMS_Infrastructure.Business.APINhanDien;
using CMS_Infrastructure.Plugins;
using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities;
using CMS_WebDesignCore.Enums;
using CMS_WebDesignCore.IBusiness;
using CMS_WebDesignCore.Wrap;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_Infrastructure.Business.AdminService
{
    public class AdminService : BaseBusiness, IAdminService
    {
        public async Task<IQueryable<CanCuocCongDan>> GetCanCuocPage(int page, int pageSize)
        {
            var query = _context.CanCuocCongDans.Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public async Task<IQueryable<DuLieu>> GetDuLieuPage(int page, int pageSize)
        {
            var query = _context.DuLieus.Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public async Task<IQueryable<GiayPhepLaiXe>> GetBLXPage(int page, int pageSize)
        {
            var query = _context.GiayPhepLaiXes.Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        //public async Task fake()
        //{
        //    string imagePath1 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\mau1.jpg";
        //    string imagePath2 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\mau2.jpg";
        //    string imagePath11 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\1.jpg";
        //    string imagePath22 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\2.jpg";
        //    byte[] imageBytes1 = File.ReadAllBytes(imagePath1);
        //    byte[] imageBytes2 = File.ReadAllBytes(imagePath2);
        //    DuLieu dl = new DuLieu();
        //    dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
        //    dl.MatTruoc = File.ReadAllBytes(imagePath1);
        //    dl.MatSau = File.ReadAllBytes(imagePath2);
        //    DuLieu dl2 = new DuLieu();
        //    dl2.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
        //    dl2.MatTruoc = File.ReadAllBytes(imagePath11);
        //    dl2.MatSau = File.ReadAllBytes(imagePath22);
        //    await _context.AddAsync(dl);
        //    await _context.SaveChangesAsync();
        //    await _context.AddAsync(dl2);
        //    await _context.SaveChangesAsync();
        //}

        public async Task<ActionStatus> ThemDuLieu(IFormFile matTruoc, IFormFile matSau)
        {
            if (matTruoc == null || matSau == null)
            {
                return ActionStatus.KHONGDUDUIEU;
            }
            DuLieu dl = new DuLieu();
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.MatTruoc = FilePlugin.File2ByteArr(matTruoc);
            dl.MatSau = FilePlugin.File2ByteArr(matSau);
            await _context.AddAsync(dl);
            await _context.SaveChangesAsync();
            return ActionStatus.THANHCONG;
        }

        public async Task<GoogleIdenDTO<CanCuocCongDan>> NhanDangCCCD(int duLieuId)
        {
            DuLieu dl = await _context.DuLieus.FindAsync(duLieuId);
            if (dl == null)
            {
                return new GoogleIdenDTO<CanCuocCongDan>()
                {
                    Status = IdenEnum.NOTFOUND
                };
            }
            GoogleIdenDTO<CanCuocCongDan> result = new GoogleIdenDTO<CanCuocCongDan>();
            FullInfo<CanCuocCongDan> cccd = MapDataCCCD.CCCDGanChip(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            result.Result = cccd;
            result.Status = IdenEnum.NHANDANGTHANHCONG;
            return result;
        }

        public async Task<GoogleIdenDTO<GiayPhepLaiXe>> NhanDangBLX(int duLieuId)
        {
            DuLieu dl = await _context.DuLieus.FindAsync(duLieuId);
            if (dl == null)
            {
                return new GoogleIdenDTO<GiayPhepLaiXe>()
                {
                    Status = IdenEnum.NOTFOUND
                };
            }
            GoogleIdenDTO<GiayPhepLaiXe> result = new GoogleIdenDTO<GiayPhepLaiXe>();
            FullInfo<GiayPhepLaiXe> cccd = MapDataBLX.BLXAddData(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            result.Result = cccd;
            result.Status = IdenEnum.NHANDANGTHANHCONG;
            return result;
        }

        public Task fake()
        {
            throw new NotImplementedException();
        }

        public async Task<CheckResult> NhanDang(int duLieuId)
        {
            DuLieu dl = await _context.DuLieus.FindAsync(duLieuId);
            if (dl == null)
            {
                return new CheckResult()
                {
                    Type = TypeCard.UNKNOW
                };
            }
            return GoogleVisionAPI.NhanDangThe(Convert.ToBase64String(dl.MatTruoc));
        }

        public async Task<ActionStatus> ThongTinCoChinhXacCCCD(int CCCDID, PropCCCDEnum prop, bool isTrue)
        {
            CanCuocCongDan cccd = await _context.CanCuocCongDans.FindAsync(CCCDID);
            if (cccd == null)
            {
                return ActionStatus.NOTFOUND;
            }
            switch (prop)
            {
                case PropCCCDEnum.SOCCCD:
                    cccd.IsSoCCCD = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.HOTEN:
                    cccd.IsHoTen = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.COGIATRIDEN:
                    cccd.IsCoGiaTriDen = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.NGAYTHANGNAMSINH:
                    cccd.IsNgayThangNamSinh = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.GIOITINH:
                    cccd.IsGioiTinh = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.QUOCTICH:
                    cccd.IsQuocTich = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.QUEQUAN:
                    cccd.IsQueQuan = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.VNM:
                    cccd.IsVNM = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.NOITHUONGTRU:
                    cccd.IsNoiThuongTru = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.DACDIEMNHANDANG:
                    cccd.IsDacDiemNhanDang = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                case PropCCCDEnum.NGAYDANGKY:
                    cccd.IsNgayDangKy = isTrue;
                    await _context.SaveChangesAsync();
                    return ActionStatus.THANHCONG;
                default:
                    return ActionStatus.THATBAI;
            }
        }

        public async Task<GoogleIdenDTO<CanCuocCongDan>> NhanDangCCCDTrucTiep(IFormFile matTruoc, IFormFile matSau)
        {
            GoogleIdenDTO<CanCuocCongDan> result = new GoogleIdenDTO<CanCuocCongDan>();
            DuLieu dl = new DuLieu();
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.MatTruoc = FilePlugin.File2ByteArr(matTruoc);
            dl.MatSau = FilePlugin.File2ByteArr(matSau);
            FullInfo<CanCuocCongDan> canCuocCongDan = MapDataCCCD.CCCDGanChip(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            await _context.AddAsync(dl);
            await _context.SaveChangesAsync();
            canCuocCongDan.Data.DuLieuId = dl.Id;
            await _context.AddAsync(canCuocCongDan.Data);
            await _context.SaveChangesAsync();
            result.Result = canCuocCongDan;
            result.Status = IdenEnum.NHANDANGTHANHCONG;
            return result;
        }

        public async Task<GoogleIdenDTO<GiayPhepLaiXe>> NhanDangBLXTrucTiep(IFormFile matTruoc, IFormFile matSau)
        {
            GoogleIdenDTO<GiayPhepLaiXe> result = new GoogleIdenDTO<GiayPhepLaiXe>();
            DuLieu dl = new DuLieu();
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.MatTruoc = FilePlugin.File2ByteArr(matTruoc);
            dl.MatSau = FilePlugin.File2ByteArr(matSau);
            FullInfo<GiayPhepLaiXe> blx = MapDataBLX.BLXAddData(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            await _context.AddAsync(dl);
            await _context.SaveChangesAsync();
            blx.Data.DuLieuId = dl.Id;
            await _context.AddAsync(blx.Data);
            await _context.SaveChangesAsync();
            result.Result = blx;
            result.Status = IdenEnum.NHANDANGTHANHCONG;
            return result;
        }

        public async Task<CheckResult> NhanDangTrucTiep(IFormFile matTruoc)
        {

            CheckResult cr = GoogleVisionAPI.NhanDangThe(Convert.ToBase64String(FilePlugin.File2ByteArr(matTruoc)));
            return cr;
        }
    }
}
