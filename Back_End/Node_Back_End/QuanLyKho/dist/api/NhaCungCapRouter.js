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
const router = express_1.default.Router();
const NhaCungCapService_1 = __importDefault(require("../services/NhaCungCapService"));
const NhaCungCap_1 = __importDefault(require("../models/NhaCungCap"));
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lst = yield NhaCungCapService_1.default.getAll();
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/getone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maNhaCungCap = typeof req.query.maNhaCungCap === "string"
        ? parseInt(req.query.maNhaCungCap)
        : null;
    if (maNhaCungCap === null) {
        res.status(500);
        return;
    }
    try {
        const lst = yield NhaCungCapService_1.default.getOne(maNhaCungCap);
        res.json(lst);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenNhaCungCap = req.query.tenNhaCungCap;
    const diaChi = req.query.diaChi;
    const soDienThoai = req.query.soDienThoai;
    const newNhaCungCap = new NhaCungCap_1.default(0, typeof tenNhaCungCap === "string" ? tenNhaCungCap : null, typeof diaChi === "string" ? diaChi : null, typeof soDienThoai === "string" ? soDienThoai : null);
    try {
        yield NhaCungCapService_1.default.add(newNhaCungCap);
        res.json(newNhaCungCap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maNhaCungCap = typeof req.query.maNhaCungCap === "string"
        ? parseInt(req.query.maNhaCungCap)
        : null;
    const tenNhaCungCap = req.query.tenNhaCungCap;
    const diaChi = req.query.diaChi;
    const soDienThoai = req.query.soDienThoai;
    if (maNhaCungCap === null) {
        res.status(500);
        return;
    }
    const newNhaCungCap = new NhaCungCap_1.default(maNhaCungCap, typeof tenNhaCungCap === "string" ? tenNhaCungCap : null, typeof diaChi === "string" ? diaChi : null, typeof soDienThoai === "string" ? soDienThoai : null);
    try {
        yield NhaCungCapService_1.default.update(newNhaCungCap);
        res.json(newNhaCungCap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const maNhaCungCap = typeof req.query.maNhaCungCap === "string"
        ? parseInt(req.query.maNhaCungCap)
        : null;
    try {
        if (maNhaCungCap !== null) {
            yield NhaCungCapService_1.default.remove(maNhaCungCap);
        }
        res.json(maNhaCungCap);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
