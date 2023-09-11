"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SanPhamService_1 = __importDefault(require("../services/SanPhamService"));
const SanPham_1 = __importDefault(require("../models/SanPham"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield SanPhamService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    if (maSanPham === null) {
        res.status(500);
        return;
    }
    try {
        const sanPham = yield SanPhamService_1.default.getOne(maSanPham);
        res.json(sanPham);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenSanPham = req.query.tenSanPham;
    const donViTinh = req.query.donViTinh;
    const giaNhap = typeof req.query.giaNhap === "string" ? parseInt(req.query.giaNhap) : null;
    const giaBan = typeof req.query.giaBan === "string" ? parseInt(req.query.giaBan) : null;
    const soLuongTon = typeof req.query.soLuongTon === "string"
        ? parseInt(req.query.soLuongTon)
        : null;
    const maNhaCungCap = typeof req.query.maNhaCungCap === "string"
        ? parseInt(req.query.maNhaCungCap)
        : null;
    const newSanPham = new SanPham_1.default(0, typeof tenSanPham === "string" ? tenSanPham : null, typeof donViTinh === "string" ? donViTinh : null, giaNhap, giaBan, soLuongTon, maNhaCungCap);
    try {
        yield SanPhamService_1.default.add(newSanPham);
        res.json(newSanPham);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    const tenSanPham = req.query.tenSanPham;
    const donViTinh = req.query.donViTinh;
    const giaNhap = typeof req.query.giaNhap === "string" ? parseInt(req.query.giaNhap) : null;
    const giaBan = typeof req.query.giaBan === "string" ? parseInt(req.query.giaBan) : null;
    const soLuongTon = typeof req.query.soLuongTon === "string"
        ? parseInt(req.query.soLuongTon)
        : null;
    const maNhaCungCap = typeof req.query.maNhaCungCap === "string"
        ? parseInt(req.query.maNhaCungCap)
        : null;
    if (maSanPham === null) {
        res.status(500);
        return;
    }
    const updatedSanPham = new SanPham_1.default(maSanPham, typeof tenSanPham === "string" ? tenSanPham : null, typeof donViTinh === "string" ? donViTinh : null, giaNhap, giaBan, soLuongTon, maNhaCungCap);
    try {
        yield SanPhamService_1.default.update(updatedSanPham);
        res.json(updatedSanPham);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    try {
        if (maSanPham !== null) {
            yield SanPhamService_1.default.remove(maSanPham);
        }
        res.json(maSanPham);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
