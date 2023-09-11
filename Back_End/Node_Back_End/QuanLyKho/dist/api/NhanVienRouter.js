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
const NhanVienService_1 = __importDefault(require("../services/NhanVienService"));
const NhanVien_1 = __importDefault(require("../models/NhanVien"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield NhanVienService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    if (maNhanVien === null) {
        res.status(500);
        return;
    }
    try {
        const nhanVien = yield NhanVienService_1.default.getOne(maNhanVien);
        res.json(nhanVien);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ho = req.query.ho;
    const ten = req.query.ten;
    const gioiTinh = req.query.gioiTinh;
    const ngaySinh = req.query.ngaySinh;
    const diaChi = req.query.diaChi;
    const newNhanVien = new NhanVien_1.default(0, typeof ho === "string" ? ho : null, typeof ten === "string" ? ten : null, typeof gioiTinh === "string" ? (gioiTinh === "true" ? true : false) : null, typeof ngaySinh === "string" ? new Date(ngaySinh) : null, typeof diaChi === "string" ? diaChi : null);
    try {
        yield NhanVienService_1.default.add(newNhanVien);
        res.json(newNhanVien);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    const ho = req.query.ho;
    const ten = req.query.ten;
    const gioiTinh = req.query.gioiTinh;
    const ngaySinh = req.query.ngaySinh;
    const diaChi = req.query.diaChi;
    if (maNhanVien === null) {
        res.status(500);
        return;
    }
    const updatedNhanVien = new NhanVien_1.default(maNhanVien, typeof ho === "string" ? ho : null, typeof ten === "string" ? ten : null, typeof gioiTinh === "string" ? (gioiTinh === "true" ? true : false) : null, typeof ngaySinh === "string" ? new Date(ngaySinh) : null, typeof diaChi === "string" ? diaChi : null);
    try {
        yield NhanVienService_1.default.update(updatedNhanVien);
        res.json(updatedNhanVien);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    try {
        if (maNhanVien !== null) {
            yield NhanVienService_1.default.remove(maNhanVien);
        }
        res.json(maNhanVien);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
