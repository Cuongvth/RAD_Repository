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
const PhieuNhapService_1 = __importDefault(require("../services/PhieuNhapService"));
const PhieuNhap_1 = __importDefault(require("../models/PhieuNhap"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield PhieuNhapService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuNhap = typeof req.query.maPhieuNhap === "string"
        ? parseInt(req.query.maPhieuNhap)
        : null;
    if (maPhieuNhap === null) {
        res.status(500);
        return;
    }
    try {
        const phieuNhap = yield PhieuNhapService_1.default.getOne(maPhieuNhap);
        res.json(phieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ngayNhap = req.query.ngayNhap;
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    const newPhieuNhap = new PhieuNhap_1.default(0, typeof ngayNhap === "string" ? new Date(ngayNhap) : null, maNhanVien);
    try {
        yield PhieuNhapService_1.default.add(newPhieuNhap);
        res.json(newPhieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuNhap = typeof req.query.maPhieuNhap === "string"
        ? parseInt(req.query.maPhieuNhap)
        : null;
    const ngayNhap = req.query.ngayNhap;
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    if (maPhieuNhap === null) {
        res.status(500);
        return;
    }
    const updatedPhieuNhap = new PhieuNhap_1.default(maPhieuNhap, typeof ngayNhap === "string" ? new Date(ngayNhap) : null, maNhanVien);
    try {
        yield PhieuNhapService_1.default.update(updatedPhieuNhap);
        res.json(updatedPhieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuNhap = typeof req.query.maPhieuNhap === "string"
        ? parseInt(req.query.maPhieuNhap)
        : null;
    try {
        if (maPhieuNhap !== null) {
            yield PhieuNhapService_1.default.remove(maPhieuNhap);
        }
        res.json(maPhieuNhap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
