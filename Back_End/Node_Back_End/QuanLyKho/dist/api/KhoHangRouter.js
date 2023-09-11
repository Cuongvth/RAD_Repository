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
const KhoHangService_1 = __importDefault(require("../services/KhoHangService"));
const KhoHang_1 = __importDefault(require("../models/KhoHang"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield KhoHangService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maKhoHang = typeof req.query.maKhoHang === "string"
        ? parseInt(req.query.maKhoHang)
        : null;
    if (maKhoHang === null) {
        res.status(500);
        return;
    }
    try {
        const lst = yield KhoHangService_1.default.getOne(maKhoHang);
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diaChi = req.query.diaChi;
    const soDienThoai = req.query.soDienThoai;
    const newKhoHang = new KhoHang_1.default(0, typeof diaChi === "string" ? diaChi : null, typeof soDienThoai === "string" ? soDienThoai : null);
    try {
        yield KhoHangService_1.default.add(newKhoHang);
        res.json(newKhoHang);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maKhoHang = typeof req.query.maKhoHang === "string"
        ? parseInt(req.query.maKhoHang)
        : null;
    const diaChi = req.query.diaChi;
    const soDienThoai = req.query.soDienThoai;
    if (maKhoHang === null) {
        res.status(500);
        return;
    }
    const newKhoHang = new KhoHang_1.default(maKhoHang, typeof diaChi === "string" ? diaChi : null, typeof soDienThoai === "string" ? soDienThoai : null);
    try {
        yield KhoHangService_1.default.update(newKhoHang);
        res.json(newKhoHang);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maKhoHang = typeof req.query.maKhoHang === "string"
        ? parseInt(req.query.maKhoHang)
        : null;
    try {
        if (maKhoHang !== null) {
            yield KhoHangService_1.default.remove(maKhoHang);
        }
        res.json(maKhoHang);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
