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
const ChiTietPhieuXuatService_1 = __importDefault(require("../services/ChiTietPhieuXuatService"));
const ChiTietPhieuXuat_1 = __importDefault(require("../models/ChiTietPhieuXuat"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield ChiTietPhieuXuatService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maChiTietPhieuXuat = typeof req.query.maChiTietPhieuXuat === "string"
        ? parseInt(req.query.maChiTietPhieuXuat)
        : null;
    if (maChiTietPhieuXuat === null) {
        res.status(500);
        return;
    }
    try {
        const lst = yield ChiTietPhieuXuatService_1.default.getOne(maChiTietPhieuXuat);
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuXuat = typeof req.query.maPhieuXuat === "string"
        ? parseInt(req.query.maPhieuXuat)
        : null;
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    const soLuongXuat = typeof req.query.soLuongXuat === "string"
        ? parseInt(req.query.soLuongXuat)
        : null;
    const newChiTietPhieuXuat = new ChiTietPhieuXuat_1.default(0, maPhieuXuat, maSanPham, soLuongXuat);
    try {
        yield ChiTietPhieuXuatService_1.default.add(newChiTietPhieuXuat);
        res.json(newChiTietPhieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maChiTietPhieuXuat = typeof req.query.maChiTietPhieuXuat === "string"
        ? parseInt(req.query.maChiTietPhieuXuat)
        : null;
    const maPhieuXuat = typeof req.query.maPhieuXuat === "string"
        ? parseInt(req.query.maPhieuXuat)
        : null;
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    const soLuongXuat = typeof req.query.soLuongXuat === "string"
        ? parseInt(req.query.soLuongXuat)
        : null;
    if (maChiTietPhieuXuat === null) {
        res.status(500);
        return;
    }
    const newChiTietPhieuXuat = new ChiTietPhieuXuat_1.default(maChiTietPhieuXuat, maPhieuXuat, maSanPham, soLuongXuat);
    try {
        yield ChiTietPhieuXuatService_1.default.update(newChiTietPhieuXuat);
        res.json(newChiTietPhieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maChiTietPhieuXuat = typeof req.query.maChiTietPhieuXuat === "string"
        ? parseInt(req.query.maChiTietPhieuXuat)
        : null;
    try {
        if (maChiTietPhieuXuat !== null) {
            yield ChiTietPhieuXuatService_1.default.remove(maChiTietPhieuXuat);
        }
        res.json(maChiTietPhieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
