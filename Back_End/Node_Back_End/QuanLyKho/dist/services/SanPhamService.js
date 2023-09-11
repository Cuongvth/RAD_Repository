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
const SanPham_1 = __importDefault(require("../models/SanPham"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM SanPham";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new SanPham_1.default(element.MaSanPham, element.TenSanPham, element.DonViTinh, element.GiaNhap, element.GiaBan, element.SoLuongTon, element.MaNhaCungCap));
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
function add(sanPham) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO SanPham (TenSanPham, DonViTinh, GiaNhap, GiaBan, SoLuongTon, MaNhaCungCap) 
                   VALUES (@TenSanPham, @DonViTinh, @GiaNhap, @GiaBan, @SoLuongTon, @MaNhaCungCap)`;
            request.input("TenSanPham", mssql_1.default.NVarChar, sanPham.tenSanPham);
            request.input("DonViTinh", mssql_1.default.NVarChar, sanPham.donViTinh);
            request.input("GiaNhap", mssql_1.default.Decimal, sanPham.giaNhap);
            request.input("GiaBan", mssql_1.default.Decimal, sanPham.giaBan);
            request.input("SoLuongTon", mssql_1.default.Int, sanPham.soLuongTon);
            request.input("MaNhaCungCap", mssql_1.default.Int, sanPham.maNhaCungCap);
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
function update(sanPham) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE SanPham 
                   SET TenSanPham = @TenSanPham, DonViTinh = @DonViTinh, GiaNhap = @GiaNhap, 
                       GiaBan = @GiaBan, SoLuongTon = @SoLuongTon, MaNhaCungCap = @MaNhaCungCap 
                   WHERE MaSanPham = @MaSanPham`;
            request.input("MaSanPham", mssql_1.default.Int, sanPham.maSanPham);
            request.input("TenSanPham", mssql_1.default.NVarChar, sanPham.tenSanPham);
            request.input("DonViTinh", mssql_1.default.NVarChar, sanPham.donViTinh);
            request.input("GiaNhap", mssql_1.default.Decimal, sanPham.giaNhap);
            request.input("GiaBan", mssql_1.default.Decimal, sanPham.giaBan);
            request.input("SoLuongTon", mssql_1.default.Int, sanPham.soLuongTon);
            request.input("MaNhaCungCap", mssql_1.default.Int, sanPham.maNhaCungCap);
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
function remove(maSanPham) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM SanPham WHERE MaSanPham = @MaSanPham`;
            request.input("MaSanPham", mssql_1.default.Int, maSanPham);
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
function getOne(maSanPham) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM SanPham WHERE MaSanPham = @MaSanPham";
            request.input("MaSanPham", mssql_1.default.Int, maSanPham);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new SanPham_1.default(element.MaSanPham, element.TenSanPham, element.DonViTinh, element.GiaNhap, element.GiaBan, element.SoLuongTon, element.MaNhaCungCap));
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
