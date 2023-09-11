class SanPham {
  constructor(
    public maSanPham: number,
    public tenSanPham: string | null,
    public donViTinh: string | null,
    public giaNhap: number | null,
    public giaBan: number | null,
    public maNhaCungCap: number | null
  ) {}
}

export default SanPham;
