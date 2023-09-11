"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const ChiTietKhoHangRouter_1 = __importDefault(require("./api/ChiTietKhoHangRouter"));
const ChiTietPhieuNhapRouter_1 = __importDefault(require("./api/ChiTietPhieuNhapRouter"));
const ChiTietPhieuXuatRouter_1 = __importDefault(require("./api/ChiTietPhieuXuatRouter"));
const HinhAnhSanPhamRouter_1 = __importDefault(require("./api/HinhAnhSanPhamRouter"));
const KhoHangRouter_1 = __importDefault(require("./api/KhoHangRouter"));
const NhaCungCapRouter_1 = __importDefault(require("./api/NhaCungCapRouter"));
const NhanVienRouter_1 = __importDefault(require("./api/NhanVienRouter"));
const PhieuNhapRouter_1 = __importDefault(require("./api/PhieuNhapRouter"));
const PhieuXuatRouter_1 = __importDefault(require("./api/PhieuXuatRouter"));
const SanPhamRouter_1 = __importDefault(require("./api/SanPhamRouter"));
const port = 3000;
app.use(body_parser_1.default.json());
app.use("/chitietkhohang", ChiTietKhoHangRouter_1.default);
app.use("/chitietphieunhap", ChiTietPhieuNhapRouter_1.default);
app.use("/chitietphieuxuat", ChiTietPhieuXuatRouter_1.default);
app.use("/hinhanhsanpham", HinhAnhSanPhamRouter_1.default);
app.use("/khohang", KhoHangRouter_1.default);
app.use("/nhacungcap", NhaCungCapRouter_1.default);
app.use("/nhanvien", NhanVienRouter_1.default);
app.use("/phieunhap", PhieuNhapRouter_1.default);
app.use("/phieuxuat", PhieuXuatRouter_1.default);
app.use("/sanpham", SanPhamRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening in http://localhost:${port}`);
});