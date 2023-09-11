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
const ChiTietPhieuXuat_1 = __importDefault(require("../models/ChiTietPhieuXuat"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM ChiTietPhieuXuat";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new ChiTietPhieuXuat_1.default(element.MaChiTietPhieuXuat, element.MaPhieuXuat, element.MaSanPham, element.SoLuongXuat));
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
function add(chiTietPhieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO ChiTietPhieuXuat (MaPhieuXuat, MaSanPham, SoLuongXuat) 
                   VALUES (@MaPhieuXuat, @MaSanPham, @SoLuongXuat)`;
            request.input("MaPhieuXuat", mssql_1.default.Int, chiTietPhieuXuat.maPhieuXuat);
            request.input("MaSanPham", mssql_1.default.Int, chiTietPhieuXuat.maSanPham);
            request.input("SoLuongXuat", mssql_1.default.Int, chiTietPhieuXuat.soLuongXuat);
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
function update(chiTietPhieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE ChiTietPhieuXuat 
                   SET MaPhieuXuat = @MaPhieuXuat, MaSanPham = @MaSanPham, SoLuongXuat = @SoLuongXuat 
                   WHERE MaChiTietPhieuXuat = @MaChiTietPhieuXuat`;
            request.input("MaChiTietPhieuXuat", mssql_1.default.Int, chiTietPhieuXuat.maChiTietPhieuXuat);
            request.input("MaPhieuXuat", mssql_1.default.Int, chiTietPhieuXuat.maPhieuXuat);
            request.input("MaSanPham", mssql_1.default.Int, chiTietPhieuXuat.maSanPham);
            request.input("SoLuongXuat", mssql_1.default.Int, chiTietPhieuXuat.soLuongXuat);
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
function remove(maChiTietPhieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM ChiTietPhieuXuat WHERE MaChiTietPhieuXuat = @MaChiTietPhieuXuat`;
            request.input("MaChiTietPhieuXuat", mssql_1.default.Int, maChiTietPhieuXuat);
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
function getOne(maChiTietPhieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM ChiTietPhieuXuat WHERE MaChiTietPhieuXuat = @MaChiTietPhieuXuat";
            request.input("MaChiTietPhieuXuat", mssql_1.default.Int, maChiTietPhieuXuat);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new ChiTietPhieuXuat_1.default(element.MaChiTietPhieuXuat, element.MaPhieuXuat, element.MaSanPham, element.SoLuongXuat));
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
