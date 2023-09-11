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
const ChiTietPhieuNhapService_1 = __importDefault(require("../services/ChiTietPhieuNhapService"));
const ChiTietPhieuNhap_1 = __importDefault(require("../models/ChiTietPhieuNhap"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield ChiTietPhieuNhapService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maChiTietPhieuNhap = typeof req.query.maChiTietPhieuNhap === "string"
        ? parseInt(req.query.maChiTietPhieuNhap)
        : null;
    if (maChiTietPhieuNhap === null) {
        res.status(500);
        return;
    }
    try {
        const lst = yield ChiTietPhieuNhapService_1.default.getOne(maChiTietPhieuNhap);
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuNhap = typeof req.query.maPhieuNhap === "string"
        ? parseInt(req.query.maPhieuNhap)
        : null;
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    const soLuongNhap = typeof req.query.soLuongNhap === "string"
        ? parseInt(req.query.soLuongNhap)
        : null;
    const newChiTietPhieuNhap = new ChiTietPhieuNhap_1.default(0, maPhieuNhap, maSanPham, soLuongNhap);
    try {
        yield ChiTietPhieuNhapService_1.default.add(newChiTietPhieuNhap);
        res.json(newChiTietPhieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maChiTietPhieuNhap = typeof req.query.maChiTietPhieuNhap === "string"
        ? parseInt(req.query.maChiTietPhieuNhap)
        : null;
    const maPhieuNhap = typeof req.query.maPhieuNhap === "string"
        ? parseInt(req.query.maPhieuNhap)
        : null;
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    const soLuongNhap = typeof req.query.soLuongNhap === "string"
        ? parseInt(req.query.soLuongNhap)
        : null;
    if (maChiTietPhieuNhap === null) {
        res.status(500);
        return;
    }
    const newChiTietPhieuNhap = new ChiTietPhieuNhap_1.default(maChiTietPhieuNhap, maPhieuNhap, maSanPham, soLuongNhap);
    try {
        yield ChiTietPhieuNhapService_1.default.update(newChiTietPhieuNhap);
        res.json(newChiTietPhieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maChiTietPhieuNhap = typeof req.query.maChiTietPhieuNhap === "string"
        ? parseInt(req.query.maChiTietPhieuNhap)
        : null;
    try {
        if (maChiTietPhieuNhap !== null) {
            yield ChiTietPhieuNhapService_1.default.remove(maChiTietPhieuNhap);
        }
        res.json(maChiTietPhieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
