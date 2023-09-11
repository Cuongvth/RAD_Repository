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
const KhoHang_1 = __importDefault(require("../models/KhoHang"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM KhoHang";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new KhoHang_1.default(element.MaKhoHang, element.Diachi, element.SoDienThoai));
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
function add(khoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO KhoHang (Diachi, SoDienThoai) 
                   VALUES (@Diachi, @SoDienThoai)`;
            request.input("Diachi", mssql_1.default.VarChar(255), khoHang.diaChi);
            request.input("SoDienThoai", mssql_1.default.VarChar(20), khoHang.soDienThoai);
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
function update(khoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE KhoHang 
                   SET Diachi = @Diachi, SoDienThoai = @SoDienThoai 
                   WHERE MaKhoHang = @MaKhoHang`;
            request.input("MaKhoHang", mssql_1.default.Int, khoHang.maKhoHang);
            request.input("Diachi", mssql_1.default.VarChar(255), khoHang.diaChi);
            request.input("SoDienThoai", mssql_1.default.VarChar(20), khoHang.soDienThoai);
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
function remove(maKhoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM KhoHang WHERE MaKhoHang = @MaKhoHang`;
            request.input("MaKhoHang", mssql_1.default.Int, maKhoHang);
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
function getOne(maKhoHang) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM KhoHang WHERE MaKhoHang = @MaKhoHang";
            request.input("MaKhoHang", mssql_1.default.Int, maKhoHang);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new KhoHang_1.default(element.MaKhoHang, element.Diachi, element.SoDienThoai));
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
