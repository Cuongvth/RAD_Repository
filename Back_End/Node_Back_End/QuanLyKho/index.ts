import express from "express";
const app = express();
import bodyParser from "body-parser";
import ChiTietKhoHangRouter from "./api/ChiTietKhoHangRouter";
import ChiTietPhieuNhapRouter from "./api/ChiTietPhieuNhapRouter";
import ChiTietPhieuXuatRouter from "./api/ChiTietPhieuXuatRouter";
import HinhAnhSanPhamRouter from "./api/HinhAnhSanPhamRouter";
import KhoHangRouter from "./api/KhoHangRouter";
import NhaCungCapRouter from "./api/NhaCungCapRouter";
import NhanVienRouter from "./api/NhanVienRouter";
import PhieuNhapRouter from "./api/PhieuNhapRouter";
import PhieuXuatRouter from "./api/PhieuXuatRouter";
import SanPhamRouter from "./api/SanPhamRouter";

const port = 3000;

app.use(bodyParser.json());

app.use("/chitietkhohang", ChiTietKhoHangRouter);
app.use("/chitietphieunhap", ChiTietPhieuNhapRouter);
app.use("/chitietphieuxuat", ChiTietPhieuXuatRouter);
app.use("/hinhanhsanpham", HinhAnhSanPhamRouter);
app.use("/khohang", KhoHangRouter);
app.use("/nhacungcap", NhaCungCapRouter);
app.use("/nhanvien", NhanVienRouter);
app.use("/phieunhap", PhieuNhapRouter);
app.use("/phieuxuat", PhieuXuatRouter);
app.use("/sanpham", SanPhamRouter);

app.listen(port, () => {
  console.log(`Example app listening in http://localhost:${port}`);
});
