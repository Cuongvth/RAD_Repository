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
const PhieuXuatService_1 = __importDefault(require("../services/PhieuXuatService"));
const PhieuXuat_1 = __importDefault(require("../models/PhieuXuat"));
const router = express_1.default.Router();
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield PhieuXuatService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuXuat = typeof req.query.maPhieuXuat === "string"
        ? parseInt(req.query.maPhieuXuat)
        : null;
    if (maPhieuXuat === null) {
        res.status(500);
        return;
    }
    try {
        const phieuXuat = yield PhieuXuatService_1.default.getOne(maPhieuXuat);
        res.json(phieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ngayXuat = req.query.ngayXuat;
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    const newPhieuXuat = new PhieuXuat_1.default(0, typeof ngayXuat === "string" ? new Date(ngayXuat) : null, maNhanVien);
    try {
        yield PhieuXuatService_1.default.add(newPhieuXuat);
        res.json(newPhieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuXuat = typeof req.query.maPhieuXuat === "string"
        ? parseInt(req.query.maPhieuXuat)
        : null;
    const ngayXuat = req.query.ngayXuat;
    const maNhanVien = typeof req.query.maNhanVien === "string"
        ? parseInt(req.query.maNhanVien)
        : null;
    if (maPhieuXuat === null) {
        res.status(500);
        return;
    }
    const updatedPhieuXuat = new PhieuXuat_1.default(maPhieuXuat, typeof ngayXuat === "string" ? new Date(ngayXuat) : null, maNhanVien);
    try {
        yield PhieuXuatService_1.default.update(updatedPhieuXuat);
        res.json(updatedPhieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maPhieuXuat = typeof req.query.maPhieuXuat === "string"
        ? parseInt(req.query.maPhieuXuat)
        : null;
    try {
        if (maPhieuXuat !== null) {
            yield PhieuXuatService_1.default.remove(maPhieuXuat);
        }
        res.json(maPhieuXuat);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
