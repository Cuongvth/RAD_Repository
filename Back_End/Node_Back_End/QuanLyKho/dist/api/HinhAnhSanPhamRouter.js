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
const HinhAnhSanPhamService_1 = __importDefault(require("../services/HinhAnhSanPhamService"));
const HinhAnhSanPham_1 = __importDefault(require("../models/HinhAnhSanPham"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield HinhAnhSanPhamService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maHinhAnh = typeof req.query.maHinhAnh === "string"
        ? parseInt(req.query.maHinhAnh)
        : null;
    if (maHinhAnh === null) {
        res.status(500);
        return;
    }
    try {
        const lst = yield HinhAnhSanPhamService_1.default.getOne(maHinhAnh);
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const duongDan = req.query.duongDan;
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    const newHinhAnhSanPham = new HinhAnhSanPham_1.default(0, typeof duongDan === "string" ? duongDan : null, maSanPham);
    try {
        yield HinhAnhSanPhamService_1.default.add(newHinhAnhSanPham);
        res.json(newHinhAnhSanPham);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maHinhAnh = typeof req.query.maHinhAnh === "string"
        ? parseInt(req.query.maHinhAnh)
        : null;
    const duongDan = req.query.duongDan;
    const maSanPham = typeof req.query.maSanPham === "string"
        ? parseInt(req.query.maSanPham)
        : null;
    if (maHinhAnh === null) {
        res.status(500);
        return;
    }
    const newHinhAnhSanPham = new HinhAnhSanPham_1.default(maHinhAnh, typeof duongDan === "string" ? duongDan : null, maSanPham);
    try {
        yield HinhAnhSanPhamService_1.default.update(newHinhAnhSanPham);
        res.json(newHinhAnhSanPham);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maHinhAnh = typeof req.query.maHinhAnh === "string"
        ? parseInt(req.query.maHinhAnh)
        : null;
    try {
        if (maHinhAnh !== null) {
            yield HinhAnhSanPhamService_1.default.remove(maHinhAnh);
        }
        res.json(maHinhAnh);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
