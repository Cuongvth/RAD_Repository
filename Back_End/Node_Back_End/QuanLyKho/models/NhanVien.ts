class NhanVien {
  constructor(
    public maNhanVien: number,
    public ho: string | null,
    public ten: string | null,
    public gioiTinh: Boolean | null,
    public ngaySinh: Date | null,
    public diaChi: string | null
  ) {}
}

export default NhanVien;
