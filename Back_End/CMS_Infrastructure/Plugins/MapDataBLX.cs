using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CMS_Infrastructure.Plugins
{
    public class MapDataBLX
    {
        public static FullInfo<GiayPhepLaiXe> BLXAddData(string[] dataMatTruoc, string[] dataMatSau)
        {
            FullInfo<GiayPhepLaiXe> data = new FullInfo<GiayPhepLaiXe>();
            data.Type = CMS_WebDesignCore.Enums.TypeCard.BLX;
            GiayPhepLaiXe result = new GiayPhepLaiXe();
            string truoc = "";
            foreach (var item in dataMatTruoc)
            {
                truoc += ("\n" + item);
            }
            string sau = "";
            foreach (var item in dataMatSau)
            {
                sau += ("\n" + item);
            }
            if (Regex.Matches(truoc.Trim(), @"\d{12}").Count > 0)
            {
                MatchCollection matches = Regex.Matches(truoc, @"\d{12}");
                result.So = matches[0].Value;
            }
            if (Regex.Matches(truoc.Trim(), @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})").Count > 0)
            {
                MatchCollection matches = Regex.Matches(truoc, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                result.NgaySinh = matches[0].Value;
            }
            if (Regex.Matches(truoc.Trim(), @"[A-Z][0-9]").Count > 0)
            {
                MatchCollection matches = Regex.Matches(truoc, @"[A-Z][0-9]");
                result.Hang = matches[0].Value;
            }
            if (Regex.Matches(sau, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})").Count > 0)
            {
                MatchCollection matches = Regex.Matches(sau, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                result.NgayTrungTuyen = matches[0].Value;
            }
            int i = 0;
            foreach (var item in dataMatTruoc)
            {
                if (Regex.Matches(item.Trim(), @"\d{5}").Count > 0)
                {
                    Console.WriteLine(i);
                    result.HoTen = dataMatTruoc[i + 1].Trim();
                    result.QuocTich = dataMatTruoc[i + 3].Trim();
                }
                if (item.Contains("Address"))
                {
                    result.NoiCuTru = dataMatTruoc[i + 1].Trim();
                }
                if (Regex.Matches(item, @".*\d{2}.*\d{2}.*\d{4}.*").Count > 0)
                {
                    MatchCollection matches = Regex.Matches(item, @".*\d{2}.*\d{2}.*\d{4}.*");
                    result.NgayDangKy = matches[0].Value;
                }
                i++;
            }
            result.MoTaXeDuocSuDung = dataMatSau[2];
            data.Data = result;
            data.GoogleMatTruoc = dataMatTruoc;
            data.GoogleMatSau = dataMatSau;
            return data;
        }
    }
}
