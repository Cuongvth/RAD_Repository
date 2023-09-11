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
const ChiTietKhoHang_1 = __importDefault(require("../models/ChiTietKhoHang"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM ChiTietKhoHang";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new ChiTietKhoHang_1.default(element.MaChiTietKhoHang, element.MaKhoHang, element.MaSanPham, element.SoLuongTon));
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
function add(chiTietKhoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO ChiTietKhoHang (MaKhoHang, MaSanPham, SoLuongTon) 
                   VALUES (@MaKhoHang, @MaSanPham, @SoLuongTon)`;
            request.input("MaKhoHang", mssql_1.default.Int, chiTietKhoHang.maKhoHang);
            request.input("MaSanPham", mssql_1.default.Int, chiTietKhoHang.maSanPham);
            request.input("SoLuongTon", mssql_1.default.Int, chiTietKhoHang.soLuongTon);
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
function update(chiTietKhoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE ChiTietKhoHang 
                   SET MaKhoHang = @MaKhoHang, MaSanPham = @MaSanPham, SoLuongTon = @SoLuongTon 
                   WHERE MaChiTietKhoHang = @MaChiTietKhoHang`;
            request.input("MaChiTietKhoHang", mssql_1.default.Int, chiTietKhoHang.maChiTietKhoHang);
            request.input("MaKhoHang", mssql_1.default.Int, chiTietKhoHang.maKhoHang);
            request.input("MaSanPham", mssql_1.default.Int, chiTietKhoHang.maSanPham);
            request.input("SoLuongTon", mssql_1.default.Int, chiTietKhoHang.soLuongTon);
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
function remove(maChiTietKhoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM ChiTietKhoHang WHERE MaChiTietKhoHang = @MaChiTietKhoHang`;
            request.input("MaChiTietKhoHang", mssql_1.default.Int, maChiTietKhoHang);
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
function getOne(maChiTietKhoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM ChiTietKhoHang WHERE MaChiTietKhoHang = @MaChiTietKhoHang";
            request.input("MaChiTietKhoHang", mssql_1.default.Int, maChiTietKhoHang);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new ChiTietKhoHang_1.default(element.MaChiTietKhoHang, element.MaKhoHang, element.MaSanPham, element.SoLuongTon));
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
