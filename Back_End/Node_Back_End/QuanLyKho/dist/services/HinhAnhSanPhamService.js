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
const HinhAnhSanPham_1 = __importDefault(require("../models/HinhAnhSanPham"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM HinhAnhSanPham";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new HinhAnhSanPham_1.default(element.MaHinhAnh, element.DuongDan, element.MaSanPham));
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
function add(hinhAnhSanPham) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO HinhAnhSanPham (DuongDan, MaSanPham) 
                   VALUES (@DuongDan, @MaSanPham)`;
            request.input("DuongDan", mssql_1.default.VarChar(255), hinhAnhSanPham.duongDan);
            request.input("MaSanPham", mssql_1.default.Int, hinhAnhSanPham.maSanPham);
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
function update(hinhAnhSanPham) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE HinhAnhSanPham 
                   SET DuongDan = @DuongDan, MaSanPham = @MaSanPham 
                   WHERE MaHinhAnh = @MaHinhAnh`;
            request.input("MaHinhAnh", mssql_1.default.Int, hinhAnhSanPham.maHinhAnh);
            request.input("DuongDan", mssql_1.default.VarChar(255), hinhAnhSanPham.duongDan);
            request.input("MaSanPham", mssql_1.default.Int, hinhAnhSanPham.maSanPham);
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
function remove(maHinhAnh) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM HinhAnhSanPham WHERE MaHinhAnh = @MaHinhAnh`;
            request.input("MaHinhAnh", mssql_1.default.Int, maHinhAnh);
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
function getOne(maHinhAnh) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM HinhAnhSanPham WHERE MaHinhAnh = @MaHinhAnh";
            request.input("MaHinhAnh", mssql_1.default.Int, maHinhAnh);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new HinhAnhSanPham_1.default(element.MaHinhAnh, element.DuongDan, element.MaSanPham));
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
