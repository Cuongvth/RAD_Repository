using CMS_Infrastructure.Business.Business_OCR.APINhanDien;
using CMS_Infrastructure.Plugins;
using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities.Entities_OCR;
using CMS_WebDesignCore.Enums;
using CMS_WebDesignCore.IBusiness.IBusiness_OCR;
using CMS_WebDesignCore.Wrap;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CMS_Infrastructure.Business.Business_OCR.AdminService
{
    public class AdminService : BaseBusiness, IAdminService
    {
        public IQueryable<CanCuocCongDan> GetCanCuocPage(int page, int pageSize)
        {
            IQueryable<CanCuocCongDan> query = _context.CanCuocCongDans.OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public int GetCanCuocCount()
        {
            return _context.CanCuocCongDans.Count();
        }

        public IQueryable<CanCuocCongDan> GetCanCuoc(int id)
        {
            return _context.CanCuocCongDans.Where(c => c.Id == id).Include(c => c.DuLieu);
        }

        public IQueryable<GiayPhepLaiXe> GetBLX(int id)
        {
            return _context.GiayPhepLaiXes.Where(c => c.Id == id).Include(c => c.DuLieu);
        }

        public IQueryable<DuLieu> GetDuLieuPage(int page, int pageSize)
        {
            IQueryable<DuLieu> query = _context.DuLieus.Where(c => c.Status == StatusData.CHUANHANDANG).OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public int GetDuLieuCount()
        {
            return _context.DuLieus.Where(c => c.Status == StatusData.CHUANHANDANG).Count();
        }

        public IQueryable<GiayPhepLaiXe> GetBLXPage(int page, int pageSize)
        {
            IQueryable<GiayPhepLaiXe> query = _context.GiayPhepLaiXes.OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public int GetBLXCount()
        {
            return _context.GiayPhepLaiXes.Count();
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
            DuLieu dl = new()
            {
                Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG,
                ThoiGianThem = DateTime.Now,
                MatTruoc = FilePlugin.File2ByteArr(matTruoc),
                MatSau = FilePlugin.File2ByteArr(matSau)
            };
            string[] ggmatTruoc = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc));
            string[] ggmatSau = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau));
            string dataTruoc = ggmatTruoc[0];
            for (int i = 1; i < ggmatTruoc.Length; i++)
            {
                dataTruoc += "\r" + ggmatTruoc[i];
            }
            string dataSau = ggmatTruoc[0];
            for (int i = 1; i < ggmatSau.Length; i++)
            {
                dataSau += "\r" + ggmatSau[i];
            }
            dl.GoogleMatTruoc = dataTruoc;
            dl.GoogleMatSau = dataSau;
            _ = await _context.AddAsync(dl);
            _ = await _context.SaveChangesAsync();
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
            dl.ThoiGianXacNhan = DateTime.Now;
            dl.Status = CMS_WebDesignCore.Enums.StatusData.DANHANDANG;
            _ = await _context.SaveChangesAsync();
            GoogleIdenDTO<CanCuocCongDan> result = new();
            FullInfo<CanCuocCongDan> cccd = MapDataCCCD.CCCDGanChip(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            cccd.Data.DuLieuId = dl.Id;
            _ = await _context.AddAsync(cccd.Data);
            _ = await _context.SaveChangesAsync();
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
            dl.ThoiGianXacNhan = DateTime.Now;
            dl.Status = CMS_WebDesignCore.Enums.StatusData.DANHANDANG;
            _ = await _context.SaveChangesAsync();
            GoogleIdenDTO<GiayPhepLaiXe> result = new();
            FullInfo<GiayPhepLaiXe> cccd = MapDataBLX.BLXAddData(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            cccd.Data.DuLieuId = dl.Id;
            _ = await _context.AddAsync(cccd.Data);
            _ = await _context.SaveChangesAsync();
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
            return dl == null
                ? new CheckResult()
                {
                    Type = TypeCard.UNKNOW
                }
                : GoogleVisionAPI.NhanDangThe(Convert.ToBase64String(dl.MatTruoc));
        }

        public async Task<ActionStatus> ThongTinCoChinhXacCCCD(int CCCDID, int isSo, int isHoTen, int isCoGiaTriDen, int isNgayThang, int isGioiTinh, int isQuocTich, int isQueQuan, int isvnm, int isNoiThuongTru, int isDacDien, int isNgayDangKi, int isMatTruoc, int isMatSau, bool isLoaiThe)
        {
            CanCuocCongDan cccd = await _context.CanCuocCongDans.FindAsync(CCCDID);
            if (cccd == null)
            {
                return ActionStatus.NOTFOUND;
            }
            cccd.IsSoCCCD = isSo;
            cccd.IsHoTen = isHoTen;
            cccd.IsCoGiaTriDen = isCoGiaTriDen;
            cccd.IsNgayThangNamSinh = isNgayThang;
            cccd.IsGioiTinh = isGioiTinh;
            cccd.IsQuocTich = isQuocTich;
            cccd.IsQueQuan = isQueQuan;
            cccd.IsVNM = isvnm;
            cccd.IsNoiThuongTru = isNoiThuongTru;
            cccd.IsDacDiemNhanDang = isDacDien;
            cccd.IsNgayDangKy = isNgayDangKi;
            cccd.DungTatCa = isSo == 100 && isHoTen == 100 && isCoGiaTriDen == 100 && isNgayThang == 100 && isGioiTinh == 100 && isQuocTich == 100 && isQueQuan == 100 && isvnm == 100 && isNoiThuongTru == 100 && isDacDien == 100 && isNgayDangKi == 100;
            try
            {
                _ = await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return ActionStatus.THATBAI;
            }
            DuLieu dulieu = await _context.DuLieus.FindAsync(cccd.DuLieuId);
            dulieu.IsMatTruoc = isMatTruoc;
            dulieu.IsMatSau = isMatSau;
            dulieu.IsLoaiThe = isLoaiThe;
            try
            {
                _ = await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return ActionStatus.THATBAI;
            }
            return ActionStatus.THANHCONG;
        }

        public async Task<ActionStatus> ThongTinCoChinhXacBLX(int BLXID, int isSo, int isHoTen, int isNoiCuTru, int isNgayThang, int isQuocTich, int isHang, int isMoTaXeDuocSuDung, int isNgayTrungTuyen, int isNgayDangKi, int isMatTruoc, int isMatSau, bool isLoaiThe)
        {
            GiayPhepLaiXe cccd = await _context.GiayPhepLaiXes.FindAsync(BLXID);
            if (cccd == null)
            {
                return ActionStatus.NOTFOUND;
            }
            cccd.IsSo = isSo;
            cccd.IsHoTen = isHoTen;
            cccd.IsNoiCuTru = isNoiCuTru;
            cccd.IsNgaySinh = isNgayThang;
            cccd.IsQuocTich = isQuocTich;
            cccd.IsHang = isHang;
            cccd.IsMoTaXeDuocSuDung = isMoTaXeDuocSuDung;
            cccd.IsNgayTrungTuyen = isNgayTrungTuyen;
            cccd.IsNgayDangKy = isNgayDangKi;
            cccd.DungTatCa = isSo == 100 && isHoTen == 100 && isNoiCuTru == 100 && isNgayThang == 100 && isQuocTich == 100 && isHang == 100 && isMoTaXeDuocSuDung == 100 && isNgayTrungTuyen == 100 && isNgayDangKi == 100;
            try
            {
                _ = await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return ActionStatus.THATBAI;
            }
            DuLieu dulieu = await _context.DuLieus.FindAsync(cccd.DuLieuId);
            dulieu.IsMatTruoc = isMatTruoc;
            dulieu.IsMatSau = isMatSau;
            dulieu.IsLoaiThe = isLoaiThe;
            try
            {
                _ = await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return ActionStatus.THATBAI;
            }
            return ActionStatus.THANHCONG;
        }


        public async Task<GoogleIdenDTO<CanCuocCongDan>> NhanDangCCCDTrucTiep(IFormFile matTruoc, IFormFile matSau)
        {
            GoogleIdenDTO<CanCuocCongDan> result = new();
            DuLieu dl = new()
            {
                MatTruoc = FilePlugin.File2ByteArr(matTruoc),
                MatSau = FilePlugin.File2ByteArr(matSau)
            };
            string[] ggmatTruoc = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc));
            string[] ggmatSau = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau));
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.ThoiGianXacNhan = DateTime.Now;
            string dataTruoc = ggmatTruoc[0];
            for (int i = 1; i < ggmatTruoc.Length; i++)
            {
                dataTruoc += "\r" + ggmatTruoc[i];
            }
            string dataSau = ggmatTruoc[0];
            for (int i = 1; i < ggmatSau.Length; i++)
            {
                dataSau += "\r" + ggmatSau[i];
            }
            dl.GoogleMatTruoc = dataTruoc;
            dl.GoogleMatSau = dataSau;
            dl.Status = StatusData.DANHANDANG;
            FullInfo<CanCuocCongDan> canCuocCongDan = MapDataCCCD.CCCDGanChip(ggmatTruoc, ggmatSau);
            _ = await _context.AddAsync(dl);
            _ = await _context.SaveChangesAsync();
            canCuocCongDan.Data.DuLieuId = dl.Id;
            _ = await _context.AddAsync(canCuocCongDan.Data);
            _ = await _context.SaveChangesAsync();
            result.Result = canCuocCongDan;
            result.Status = IdenEnum.NHANDANGTHANHCONG;
            return result;
        }

        public async Task<GoogleIdenDTO<GiayPhepLaiXe>> NhanDangBLXTrucTiep(IFormFile matTruoc, IFormFile matSau)
        {
            GoogleIdenDTO<GiayPhepLaiXe> result = new();
            DuLieu dl = new()
            {
                MatTruoc = FilePlugin.File2ByteArr(matTruoc),
                MatSau = FilePlugin.File2ByteArr(matSau)
            };
            string[] ggmatTruoc = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc));
            string[] ggmatSau = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau));
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.ThoiGianXacNhan = DateTime.Now;
            string dataTruoc = ggmatTruoc[0];
            for (int i = 1; i < ggmatTruoc.Length; i++)
            {
                dataTruoc += "\r" + ggmatTruoc[i];
            }
            string dataSau = ggmatTruoc[0];
            for (int i = 1; i < ggmatSau.Length; i++)
            {
                dataSau += "\r" + ggmatSau[i];
            }
            dl.GoogleMatTruoc = dataTruoc;
            dl.GoogleMatSau = dataSau;
            dl.Status = StatusData.DANHANDANG;
            FullInfo<GiayPhepLaiXe> blx = MapDataBLX.BLXAddData(ggmatTruoc, ggmatSau);
            _ = await _context.AddAsync(dl);
            _ = await _context.SaveChangesAsync();
            blx.Data.DuLieuId = dl.Id;
            _ = await _context.AddAsync(blx.Data);
            _ = await _context.SaveChangesAsync();
            result.Result = blx;
            result.Status = IdenEnum.NHANDANGTHANHCONG;
            return result;
        }

        public CheckResult NhanDangTrucTiep(IFormFile matTruoc)
        {

            CheckResult cr = GoogleVisionAPI.NhanDangThe(Convert.ToBase64String(FilePlugin.File2ByteArr(matTruoc)));
            return cr;
        }

        Task<IQueryable<CanCuocCongDan>> IAdminService.GetCanCuocPage(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        Task<int> IAdminService.GetCanCuocCount()
        {
            throw new NotImplementedException();
        }

        Task<int> IAdminService.GetBLXCount()
        {
            throw new NotImplementedException();
        }

        Task<int> IAdminService.GetDuLieuCount()
        {
            throw new NotImplementedException();
        }

        Task<IQueryable<GiayPhepLaiXe>> IAdminService.GetBLX(int id)
        {
            throw new NotImplementedException();
        }

        Task<IQueryable<CanCuocCongDan>> IAdminService.GetCanCuoc(int id)
        {
            throw new NotImplementedException();
        }

        Task<IQueryable<DuLieu>> IAdminService.GetDuLieuPage(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        Task<IQueryable<GiayPhepLaiXe>> IAdminService.GetBLXPage(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        Task<CheckResult> IAdminService.NhanDangTrucTiep(IFormFile matTruoc)
        {
            throw new NotImplementedException();
        }
    }
}
