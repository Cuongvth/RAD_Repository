using CMS_WebDesignCore.Entities;
using CMS_WebDesignCore.IBusiness;
using System;
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

        public async Task fake()
        {
            string imagePath1 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\mau1.jpg";
            string imagePath2 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\mau2.jpg";
            string imagePath11 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\1.jpg";
            string imagePath22 = "C:\\Users\\LTS\\Documents\\GitHub\\Computer_Vision\\data-test\\2.jpg";
            byte[] imageBytes1 = File.ReadAllBytes(imagePath1);
            byte[] imageBytes2 = File.ReadAllBytes(imagePath2);
            DuLieu dl = new DuLieu();
            dl.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl.MatTruoc = File.ReadAllBytes(imagePath1);
            dl.MatSau = File.ReadAllBytes(imagePath2);
            DuLieu dl2 = new DuLieu();
            dl2.Status = CMS_WebDesignCore.Enums.StatusData.CHUANHANDANG;
            dl2.MatTruoc = File.ReadAllBytes(imagePath11);
            dl2.MatSau = File.ReadAllBytes(imagePath22);
            await _context.AddAsync(dl);
            await _context.SaveChangesAsync();
            await _context.AddAsync(dl2);
            await _context.SaveChangesAsync();
        }
    }
}
