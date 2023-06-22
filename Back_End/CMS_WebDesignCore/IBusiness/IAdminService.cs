using CMS_WebDesignCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.IBusiness
{
    public interface IAdminService
    {

        Task<IQueryable<CanCuocCongDan>> GetCanCuocPage(int page,int pageSize);
        Task<IQueryable<DuLieu>> GetDuLieuPage(int page, int pageSize);
        Task<IQueryable<GiayPhepLaiXe>> GetBLXPage(int page, int pageSize);
        Task fake();
    }
}
