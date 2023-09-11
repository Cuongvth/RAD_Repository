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
const ChiTietPhieuNhap_1 = __importDefault(require("../models/ChiTietPhieuNhap"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM ChiTietPhieuNhap";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new ChiTietPhieuNhap_1.default(element.MaChiTietPhieuNhap, element.MaPhieuNhap, element.MaSanPham, element.SoLuongNhap));
            return lst;
        }
        catch (err) {
            throw err;
        }
        finally {
            pool.close();
        }
    });
}
function add(chiTietPhieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO ChiTietPhieuNhap (MaPhieuNhap, MaSanPham, SoLuongNhap) 
                   VALUES (@MaPhieuNhap, @MaSanPham, @SoLuongNhap)`;
            request.input("MaPhieuNhap", mssql_1.default.Int, chiTietPhieuNhap.maPhieuNhap);
            request.input("MaSanPham", mssql_1.default.Int, chiTietPhieuNhap.maSanPham);
            request.input("SoLuongNhap", mssql_1.default.Int, chiTietPhieuNhap.soLuongNhap);
            const result = yield request.query(query);
        }
        catch (err) {
            throw err;
        }
        finally {
            pool.close();
        }
    });
}
function update(chiTietPhieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE ChiTietPhieuNhap 
                   SET MaPhieuNhap = @MaPhieuNhap, MaSanPham = @MaSanPham, SoLuongNhap = @SoLuongNhap 
                   WHERE MaChiTietPhieuNhap = @MaChiTietPhieuNhap`;
            request.input("MaChiTietPhieuNhap", mssql_1.default.Int, chiTietPhieuNhap.maChiTietPhieuNhap);
            request.input("MaPhieuNhap", mssql_1.default.Int, chiTietPhieuNhap.maPhieuNhap);
            request.input("MaSanPham", mssql_1.default.Int, chiTietPhieuNhap.maSanPham);
            request.input("SoLuongNhap", mssql_1.default.Int, chiTietPhieuNhap.soLuongNhap);
            const result = yield request.query(query);
        }
        catch (err) {
            throw err;
        }
        finally {
            pool.close();
        }
    });
}
function remove(maChiTietPhieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM ChiTietPhieuNhap WHERE MaChiTietPhieuNhap = @MaChiTietPhieuNhap`;
            request.input("MaChiTietPhieuNhap", mssql_1.default.Int, maChiTietPhieuNhap);
            const result = yield request.query(query);
        }
        catch (err) {
            throw err;
        }
        finally {
            pool.close();
        }
    });
}
function getOne(maChiTietPhieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM ChiTietPhieuNhap WHERE MaChiTietPhieuNhap = @MaChiTietPhieuNhap";
            request.input("MaChiTietPhieuNhap", mssql_1.default.Int, maChiTietPhieuNhap);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new ChiTietPhieuNhap_1.default(element.MaChiTietPhieuNhap, element.MaPhieuNhap, element.MaSanPham, element.SoLuongNhap));
            return lst;
        }
        catch (err) {
            throw err;
        }
        finally {
            pool.close();
        }
    });
}
exports.default = { getAll, add, update, remove, getOne };
