using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_Infrastructure.Plugins
{
    internal class MapDataCCCD
    {
        public static FullInfo<CanCuocCongDan> CCCDGanChip(string[] dataMatTruoc, string[] dataMatSau)
        {
            FullInfo<CanCuocCongDan> data = new FullInfo<CanCuocCongDan>();
            CanCuocCongDan result = new CanCuocCongDan();
            int i = 0;
            foreach (var item in dataMatTruoc)
            {
                if (item.Contains("No.:"))
                {
                    result.SoCCCD = item.Split(":")[1].Trim();
                }
                if (item.Contains("Full name:"))
                {
                    result.HoTen = dataMatTruoc[i + 1].Trim();

                }
                if (item.Contains("Date of birth:"))
                {
                    result.NgayThangNamSinh = item.Split(":")[1].Trim();
                }
                if (item.Contains("Sex:"))
                {
                    result.GioiTinh = item.Split(":")[1].Trim().Split(" ")[0];
                }
                if (item.Contains("Nationality:"))
                {
                    result.QuocTich = item.Split("Nationality:")[1].Trim();
                }
                if (item.Contains("Nationality."))
                {
                    result.QuocTich = item.Split("Nationality.")[1].Trim();
                }
                if (item.Contains("Place of origin:"))
                {
                    result.QueQuan = dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("residence:"))
                {
                    if (result.NoiThuongTru == null)
                    {
                        result.NoiThuongTru = item.Split("residence:")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                    }
                }
                if (item.Contains("residence"))
                {
                    if (result.NoiThuongTru == null)
                    {
                        result.NoiThuongTru = item.Split("residence")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                    }
                }
                if (item.Contains("Có giá trị đến:"))
                {
                    if (result.CoGiaTriDen == null)
                    {
                        result.CoGiaTriDen = item.Split("Có giá trị đến:")[1].Trim();
                    }
                }
                if (item.Contains("Date of expiry"))
                {
                    if (result.CoGiaTriDen == null)
                    {
                        result.CoGiaTriDen = dataMatTruoc[i + 1];
                    }
                }
                i++;
            }
            i = 0;
            foreach (var item in dataMatSau)
            {
                if (item.Contains("identification:"))
                {
                    result.DacDiemNhanDang = dataMatSau[i + 1];
                    if (!dataMatSau[i + 2].Contains("Date, month, year"))
                    {
                        result.DacDiemNhanDang += " " + dataMatSau[i + 2];
                    }

                }
                if (item.Contains("Date, month, year"))
                {
                    result.NgayDangKy = item.Split("year")[1].Replace(":", "").Trim();
                }
                i++;
            }
            result.VNM = dataMatSau[dataMatSau.Length - 3] + dataMatSau[dataMatSau.Length - 2] + dataMatSau[dataMatSau.Length - 1];
            data.Data = result;
            data.GoogleMatTruoc = dataMatTruoc;
            data.GoogleMatSau = dataMatSau;
            return data;
        }

    }
}
