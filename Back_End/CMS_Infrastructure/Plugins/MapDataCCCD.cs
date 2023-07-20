using CMS_WebDesignCore.DTO;
using CMS_WebDesignCore.Entities.Entities_OCR;
using System.Text.RegularExpressions;

namespace CMS_Infrastructure.Plugins
{
    internal class MapDataCCCD
    {
        public static FullInfo<CanCuocCongDan> CCCDGanChip(string[] dataMatTruoc, string[] dataMatSau)
        {
            FullInfo<CanCuocCongDan> data = new()
            {
                Type = CMS_WebDesignCore.Enums.TypeCard.CCCD
            };
            CanCuocCongDan result = new();
            int i = 0;
            string truoc = "";
            foreach (string item in dataMatTruoc)
            {
                truoc += "\n" + item;
            }
            string sau = "";
            foreach (string item in dataMatSau)
            {
                sau += "\n" + item;
            }
            if (Regex.Matches(truoc.Trim(), @"\d{12}").Count > 0)
            {
                MatchCollection matches = Regex.Matches(truoc, @"\d{12}");
                result.SoCCCD = matches[0].Value;
            }
            if (Regex.Matches(truoc.Trim(), @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})").Count > 1)
            {
                MatchCollection matches = Regex.Matches(truoc, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                bool check = int.Parse(matches[0].Value[^4..]) - int.Parse(matches[1].Value[^4..]) > 0;
                result.CoGiaTriDen = check ? matches[0].Value : matches[1].Value;
                result.NgayThangNamSinh = check ? matches[1].Value : matches[0].Value;
            }
            if (Regex.Matches(sau, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})").Count > 0)
            {
                MatchCollection matches = Regex.Matches(sau, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                result.NgayDangKy = matches[0].Value;
            }
            foreach (string item in dataMatTruoc)
            {
                if (Regex.Matches(item.Trim(), @"\b[\p{Lu}]+\b").Count == item.Trim().Split(" ").Length)
                {
                    result.HoTen = item.Trim();
                }
                if (item.Contains("Full name"))
                {
                    result.HoTen ??= dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("Date of birth"))
                {
                    MatchCollection matches = Regex.Matches(item, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                    if (matches.Count > 0)
                    {
                        result.NgayThangNamSinh = matches[0].Value;
                    }
                    MatchCollection matches1 = Regex.Matches(dataMatTruoc[i + 1], @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                    if (matches1.Count > 0)
                    {
                        result.NgayThangNamSinh = matches1[0].Value;
                    }
                }
                if (item.Contains("Sex"))
                {
                    MatchCollection matches = Regex.Matches(item, @"Sex.+(Nam|Nữ).+Nationality");
                    if (matches.Count > 0)
                    {
                        string temp = matches[0].Value;
                        result.GioiTinh = temp.Contains("Nam") ? "Nam" : "Nữ";
                    }
                }
                if (item.Contains("Nationality"))
                {
                    MatchCollection matches = Regex.Matches(item, @"Nationality.+");
                    result.QuocTich = matches.Count > 0 ? matches[0].Value.Replace("Nationality", "").Replace(":", "").Replace(".", "").Trim() : "Việt Nam";
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
                    result.NoiThuongTru ??= item.Split("residence.")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("residence"))
                {
                    result.NoiThuongTru ??= item.Split("residence")[1].Trim() + " " + dataMatTruoc[i + 1].Trim();
                }
                if (item.Contains("Có giá trị đến"))
                {
                    MatchCollection matches = Regex.Matches(item, @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                    if (matches.Count > 0)
                    {
                        result.CoGiaTriDen = matches[0].Value;
                    }
                }
                if (item.Contains("Date of expiry"))
                {
                    if (result.CoGiaTriDen == null)
                    {
                        MatchCollection matches = Regex.Matches(dataMatTruoc[i + 1], @"(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})");
                        if (matches.Count > 0)
                        {
                            result.CoGiaTriDen = matches[0].Value;
                        }
                    }
                }
                i++;
            }
            i = 0;
            foreach (string item in dataMatSau)
            {
                if (item.Contains("identification"))
                {
                    result.DacDiemNhanDang = dataMatSau[i + 1];
                    if (!dataMatSau[i + 2].Contains("year") || !dataMatSau[i + 2].Contains("month") || !dataMatSau[i + 2].Contains("Date"))
                    {
                        result.DacDiemNhanDang += " " + dataMatSau[i + 2];
                    }

                }
                if (item.Contains("year") || item.Contains("month") || item.Contains("Date"))
                {
                    result.NgayDangKy ??= item.Split("year")[1].Replace(":", "").Replace(".", "").Trim();
                }
                i++;
            }
            result.VNM = dataMatSau[^3] + dataMatSau[^2] + dataMatSau[^1];
            data.Data = result;
            data.GoogleMatTruoc = dataMatTruoc;
            data.GoogleMatSau = dataMatSau;
            return data;
        }

    }
}
