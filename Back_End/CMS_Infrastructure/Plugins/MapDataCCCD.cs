using CMS_Infrastructure.Migrations;
using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CMS_Infrastructure.Plugins
{
    internal class MapDataCCCD
    {
        public static FullInfo<CanCuocCongDan> CCCDGanChip(string[] dataMatTruoc, string[] dataMatSau)
        {
            FullInfo<CanCuocCongDan> data = new FullInfo<CanCuocCongDan>();
            data.Type = CMS_WebDesignCore.Enums.TypeCard.CCCD;
            CanCuocCongDan result = new CanCuocCongDan();
            int i = 0;
            foreach (var item in dataMatTruoc)
            {
                if (Regex.Matches(item.Trim(), @"\d{12}").Count > 0)
                {
                    MatchCollection matches = Regex.Matches(item, @"\d{12}");
                    result.SoCCCD = matches[0].Value;
                }
                if (Regex.Matches(item.Trim(), @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})").Count > 1)
                {
                    MatchCollection matches = Regex.Matches(item, @"\d{12}");
                    result.CoGiaTriDen = matches[0].Value;
                    result.NgayThangNamSinh = matches[1].Value;
                }
                if (Regex.Matches(item.Trim(), @"\b[\p{Lu}]+\b").Count == item.Trim().Split(" ").Length)
                {
                    result.HoTen = item.Trim();
                }
                if (item.Contains("No."))
                {
                    if (result.SoCCCD == null)
                    {
                        string pattern = @"\d";
                        MatchCollection matches = Regex.Matches(item, pattern);
                        if (matches.Count > 0)
                        {
                            result.SoCCCD = matches[0].Value;
                        }
                    }
                }
                if (item.Contains("Full name"))
                {
                    if (result.HoTen == null)
                    {
                        result.HoTen = dataMatTruoc[i + 1].Trim();
                    }
                }
                if (item.Contains("Date of birth"))
                {
                    string pattern = @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})";
                    MatchCollection matches = Regex.Matches(item, pattern);
                    if (matches.Count > 0)
                    {
                        result.NgayThangNamSinh = matches[0].Value;
                    }
                    MatchCollection matches1 = Regex.Matches(dataMatTruoc[i + 1], pattern);
                    if (matches1.Count > 0)
                    {
                        result.NgayThangNamSinh = matches1[0].Value;
                    }
                }
                if (item.Contains("Sex"))
                {
                    string pattern = @"Sex.+(Nam|Nữ).+Nationality";
                    MatchCollection matches = Regex.Matches(item, pattern);
                    if (matches.Count > 0)
                    {
                        string temp = matches[0].Value;
                        if (temp.Contains("Nam"))
                        {
                            result.GioiTinh = "Nam";
                        }
                        else
                        {
                            result.GioiTinh = "Nữ";
                        }
                    }
                }
                if (item.Contains("Nationality"))
                {
                    string pattern = @"Nationality.+";
                    MatchCollection matches = Regex.Matches(item, pattern);
                    if (matches.Count > 0)
                    {
                        result.QuocTich = matches[0].Value.Replace("Nationality", "").Replace(":", "").Replace(".", "");
                    }
                }
                if (item.Contains("Place of origin"))
                {
                    result.QueQuan = dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("residence:"))
                {
                    result.NoiThuongTru = item.Split("residence:")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("residence."))
                {
                    if (result.NoiThuongTru == null) result.NoiThuongTru = item.Split("residence.")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("residence"))
                {
                    if (result.NoiThuongTru == null) result.NoiThuongTru = item.Split("residence")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("Có giá trị đến:"))
                {
                    string pattern = @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})";
                    MatchCollection matches = Regex.Matches(item, pattern);
                    if (matches.Count > 0)
                    {
                        result.CoGiaTriDen = matches[0].Value;
                    }
                }
                if (item.Contains("Date of expiry"))
                {
                    if (result.CoGiaTriDen == null)
                    {
                        string pattern = @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})";
                        MatchCollection matches = Regex.Matches(dataMatTruoc[i + 1], pattern);
                        if (matches.Count > 0)
                        {
                            result.CoGiaTriDen = matches[0].Value;
                        }
                    }
                }
                i++;
            }
            i = 0;
            foreach (var item in dataMatSau)
            {
                if (Regex.Matches(item, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})").Count > 0)
                {
                    string pattern = @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})";
                    MatchCollection matches = Regex.Matches(item, pattern);
                    if (matches.Count > 0)
                    {
                        result.NgayDangKy = matches[0].Value;
                    }
                }
                if (item.Contains("identification:"))
                {
                    result.DacDiemNhanDang = dataMatSau[i + 1];
                    if (!dataMatSau[i + 2].Contains("year") || !dataMatSau[i + 2].Contains("month") || !dataMatSau[i + 2].Contains("Date"))
                    {
                        result.DacDiemNhanDang += " " + dataMatSau[i + 2];
                    }

                }
                if (item.Contains("year") || item.Contains("month") || item.Contains("Date"))
                {
                   if(result.NgayDangKy == null) result.NgayDangKy = item.Split("year")[1].Replace(":", "").Replace(".", "").Trim();
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
