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
const NhanVien_1 = __importDefault(require("../models/NhanVien"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM NhanVien";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new NhanVien_1.default(element.MaNhanVien, element.Ho, element.Ten, element.GioiTinh, element.NgaySinh, element.DiaChi));
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
function add(nhanVien) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO NhanVien (Ho, Ten, GioiTinh, NgaySinh, DiaChi) 
                   VALUES (@Ho, @Ten, @GioiTinh, @NgaySinh, @DiaChi)`;
            request.input("Ho", mssql_1.default.VarChar(50), nhanVien.ho);
            request.input("Ten", mssql_1.default.VarChar(50), nhanVien.ten);
            request.input("GioiTinh", mssql_1.default.Bit, nhanVien.gioiTinh);
            request.input("NgaySinh", mssql_1.default.Date, nhanVien.ngaySinh);
            request.input("DiaChi", mssql_1.default.VarChar(255), nhanVien.diaChi);
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
function update(nhanVien) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE NhanVien 
                   SET Ho = @Ho, Ten = @Ten, GioiTinh = @GioiTinh, NgaySinh = @NgaySinh, DiaChi = @DiaChi 
                   WHERE MaNhanVien = @MaNhanVien`;
            request.input("MaNhanVien", mssql_1.default.Int, nhanVien.maNhanVien);
            request.input("Ho", mssql_1.default.VarChar(50), nhanVien.ho);
            request.input("Ten", mssql_1.default.VarChar(50), nhanVien.ten);
            request.input("GioiTinh", mssql_1.default.Bit, nhanVien.gioiTinh);
            request.input("NgaySinh", mssql_1.default.Date, nhanVien.ngaySinh);
            request.input("DiaChi", mssql_1.default.VarChar(255), nhanVien.diaChi);
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
function remove(maNhanVien) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM NhanVien WHERE MaNhanVien = @MaNhanVien`;
            request.input("MaNhanVien", mssql_1.default.Int, maNhanVien);
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
function getOne(maNhanVien) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM NhanVien WHERE MaNhanVien = @MaNhanVien";
            request.input("MaNhanVien", mssql_1.default.Int, maNhanVien);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new NhanVien_1.default(element.MaNhanVien, element.Ho, element.Ten, element.GioiTinh, element.NgaySinh, element.DiaChi));
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
