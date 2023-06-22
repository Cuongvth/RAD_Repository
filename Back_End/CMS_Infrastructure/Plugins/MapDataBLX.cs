using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_Infrastructure.Plugins
{
    public class MapDataBLX
    {
        public static FullInfo<GiayPhepLaiXe> BLXAddData(string[] dataMatTruoc, string[] dataMatSau)
        {
            FullInfo<GiayPhepLaiXe> data = new FullInfo<GiayPhepLaiXe>();
            GiayPhepLaiXe result = new GiayPhepLaiXe();
            int i = 0;
            foreach (var item in dataMatTruoc)
            {
                if (item.Contains("No:"))
                {
                    result.So = item.Split(":")[1].Trim();
                    result.HoTen = dataMatTruoc[i + 1].Trim();
                    result.NgaySinh = dataMatTruoc[i + 2].Trim();
                    result.QuocTich = dataMatTruoc[i + 3].Trim();
                }
                if (item.Contains("Address:"))
                {
                    result.NoiCuTru = dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("Class:"))
                {
                    result.Hang = item.Split(":")[1].Trim();
                }
                i++;
            }
              result.MoTaXeDuocSuDung = dataMatSau[2];
              result.NgayTrungTuyen = dataMatSau[6];
            data.Data = result;
            data.GoogleMatTruoc = dataMatTruoc;
            data.GoogleMatSau = dataMatSau;
            return data;
        }
    }
}
