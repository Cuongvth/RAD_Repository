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
const PhieuNhap_1 = __importDefault(require("../models/PhieuNhap"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM PhieuNhap";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new PhieuNhap_1.default(element.MaPhieuNhap, element.NgayNhap, element.MaNhanVien));
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
function add(phieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO PhieuNhap (NgayNhap, MaNhanVien) 
                   VALUES (@NgayNhap, @MaNhanVien)`;
            request.input("NgayNhap", mssql_1.default.Date, phieuNhap.ngayNhap);
            request.input("MaNhanVien", mssql_1.default.Int, phieuNhap.maNhanVien);
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
function update(phieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE PhieuNhap 
                   SET NgayNhap = @NgayNhap, MaNhanVien = @MaNhanVien 
                   WHERE MaPhieuNhap = @MaPhieuNhap`;
            request.input("MaPhieuNhap", mssql_1.default.Int, phieuNhap.maPhieuNhap);
            request.input("NgayNhap", mssql_1.default.Date, phieuNhap.ngayNhap);
            request.input("MaNhanVien", mssql_1.default.Int, phieuNhap.maNhanVien);
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
function remove(maPhieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM PhieuNhap WHERE MaPhieuNhap = @MaPhieuNhap`;
            request.input("MaPhieuNhap", mssql_1.default.Int, maPhieuNhap);
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
function getOne(maPhieuNhap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM PhieuNhap WHERE MaPhieuNhap = @MaPhieuNhap";
            request.input("MaPhieuNhap", mssql_1.default.Int, maPhieuNhap);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new PhieuNhap_1.default(element.MaPhieuNhap, element.NgayNhap, element.MaNhanVien));
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
