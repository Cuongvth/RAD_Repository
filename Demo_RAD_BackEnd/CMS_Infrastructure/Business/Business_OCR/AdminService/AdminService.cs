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
        public async Task<IQueryable<CanCuocCongDan>> GetCanCuocPage(int page, int pageSize)
        {
            var query = _context.CanCuocCongDans.OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public async Task<int> GetCanCuocCount()
        {
            return _context.CanCuocCongDans.Count();
        }

        public async Task<IQueryable<CanCuocCongDan>> GetCanCuoc(int id)
        {
            return _context.CanCuocCongDans.Where(c => c.Id == id).Include(c => c.DuLieu);
        }

        public async Task<IQueryable<GiayPhepLaiXe>> GetBLX(int id)
        {
            return _context.GiayPhepLaiXes.Where(c => c.Id == id).Include(c => c.DuLieu);
        }

        public async Task<IQueryable<DuLieu>> GetDuLieuPage(int page, int pageSize)
        {
            var query = _context.DuLieus.Where(c => c.Status == StatusData.CHUANHANDANG).OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public async Task<int> GetDuLieuCount()
        {
            return _context.DuLieus.Where(c => c.Status == StatusData.CHUANHANDANG).Count();
        }

        public async Task<IQueryable<GiayPhepLaiXe>> GetBLXPage(int page, int pageSize)
        {
            var query = _context.GiayPhepLaiXes.OrderBy(c => c.Id).Skip((page - 1) * pageSize).Take(pageSize);
            return query;
        }

        public async Task<int> GetBLXCount()
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
            DuLieu dl = new DuLieu();
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.MatTruoc = FilePlugin.File2ByteArr(matTruoc);
            dl.MatSau = FilePlugin.File2ByteArr(matSau);
            var ggmatTruoc = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc));
            var ggmatSau = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau));
            var dataTruoc = ggmatTruoc[0];
            for (int i = 1; i < ggmatTruoc.Length; i++)
            {
                dataTruoc += ("\r" + ggmatTruoc[i]);
            }
            var dataSau = ggmatTruoc[0];
            for (int i = 1; i < ggmatSau.Length; i++)
            {
                dataSau += ("\r" + ggmatSau[i]);
            }
            dl.GoogleMatTruoc = dataTruoc;
            dl.GoogleMatSau = dataSau;
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
            dl.ThoiGianXacNhan = DateTime.Now;
            dl.Status = CMS_WebDesignCore.Enums.StatusData.DANHANDANG;
            await _context.SaveChangesAsync();
            GoogleIdenDTO<CanCuocCongDan> result = new GoogleIdenDTO<CanCuocCongDan>();
            FullInfo<CanCuocCongDan> cccd = MapDataCCCD.CCCDGanChip(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            cccd.Data.DuLieuId = dl.Id;
            await _context.AddAsync(cccd.Data);
            await _context.SaveChangesAsync();
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
            await _context.SaveChangesAsync();
            GoogleIdenDTO<GiayPhepLaiXe> result = new GoogleIdenDTO<GiayPhepLaiXe>();
            FullInfo<GiayPhepLaiXe> cccd = MapDataBLX.BLXAddData(GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc)), GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau)));
            cccd.Data.DuLieuId = dl.Id;
            await _context.AddAsync(cccd.Data);
            await _context.SaveChangesAsync();
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
            if (isSo == 100 && isHoTen == 100 && isCoGiaTriDen == 100 && isNgayThang == 100 && isGioiTinh == 100 && isQuocTich == 100 && isQueQuan == 100 && isvnm == 100 && isNoiThuongTru == 100 && isDacDien == 100 && isNgayDangKi == 100)
            {
                cccd.DungTatCa = true;
            }
            else
            {
                cccd.DungTatCa = false;
            }
            try
            {
                await _context.SaveChangesAsync();
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
                await _context.SaveChangesAsync();
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
            if (isSo == 100 && isHoTen == 100 && isNoiCuTru == 100 && isNgayThang == 100 && isQuocTich == 100 && isHang == 100 && isMoTaXeDuocSuDung == 100 && isNgayTrungTuyen == 100 && isNgayDangKi == 100)
            {
                cccd.DungTatCa = true;
            }
            else
            {
                cccd.DungTatCa = false;
            }
            try
            {
                await _context.SaveChangesAsync();
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
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return ActionStatus.THATBAI;
            }
            return ActionStatus.THANHCONG;
        }


        public async Task<GoogleIdenDTO<CanCuocCongDan>> NhanDangCCCDTrucTiep(IFormFile matTruoc, IFormFile matSau)
        {
            GoogleIdenDTO<CanCuocCongDan> result = new GoogleIdenDTO<CanCuocCongDan>();
            DuLieu dl = new DuLieu();
            dl.MatTruoc = FilePlugin.File2ByteArr(matTruoc);
            dl.MatSau = FilePlugin.File2ByteArr(matSau);
            var ggmatTruoc = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc));
            var ggmatSau = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau));
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.ThoiGianXacNhan = DateTime.Now;
            var dataTruoc = ggmatTruoc[0];
            for (int i = 1; i < ggmatTruoc.Length; i++)
            {
                dataTruoc += ("\r" + ggmatTruoc[i]);
            }
            var dataSau = ggmatTruoc[0];
            for (int i = 1; i < ggmatSau.Length; i++)
            {
                dataSau += ("\r" + ggmatSau[i]);
            }
            dl.GoogleMatTruoc = dataTruoc;
            dl.GoogleMatSau = dataSau;
            dl.Status = StatusData.DANHANDANG;
            FullInfo<CanCuocCongDan> canCuocCongDan = MapDataCCCD.CCCDGanChip(ggmatTruoc, ggmatSau);
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
            dl.MatTruoc = FilePlugin.File2ByteArr(matTruoc);
            dl.MatSau = FilePlugin.File2ByteArr(matSau);
            var ggmatTruoc = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatTruoc));
            var ggmatSau = GoogleVisionAPI.LayThongTinTrenThe(Convert.ToBase64String(dl.MatSau));
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.ThoiGianThem = DateTime.Now;
            dl.ThoiGianXacNhan = DateTime.Now;
            var dataTruoc = ggmatTruoc[0];
            for (int i = 1; i < ggmatTruoc.Length; i++)
            {
                dataTruoc += ("\r" + ggmatTruoc[i]);
            }
            var dataSau = ggmatTruoc[0];
            for (int i = 1; i < ggmatSau.Length; i++)
            {
                dataSau += ("\r" + ggmatSau[i]);
            }
            dl.GoogleMatTruoc = dataTruoc;
            dl.GoogleMatSau = dataSau;
            dl.Status = StatusData.DANHANDANG;
            FullInfo<GiayPhepLaiXe> blx = MapDataBLX.BLXAddData(ggmatTruoc, ggmatSau);
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
