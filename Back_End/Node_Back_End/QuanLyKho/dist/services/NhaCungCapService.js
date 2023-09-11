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
const NhaCungCap_1 = __importDefault(require("../models/NhaCungCap"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM NhaCungCap";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new NhaCungCap_1.default(element.MaNhaCungCap, element.TenNhaCungCap, element.DiaChi, element.SoDienThoai));
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
function add(nhaCungCap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO NhaCungCap (TenNhaCungCap, DiaChi, SoDienThoai) VALUES (@TenNhaCungCap, @DiaChi, @SoDienThoai)`;
            request.input("TenNhaCungCap", mssql_1.default.NVarChar, nhaCungCap.tenNhaCungCap);
            request.input("DiaChi", mssql_1.default.NVarChar, nhaCungCap.diaChi);
            request.input("SoDienThoai", mssql_1.default.VarChar, nhaCungCap.soDienThoai);
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
function update(nhaCungCap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE NhaCungCap SET TenNhaCungCap = @TenNhaCungCap, DiaChi = @DiaChi, SoDienThoai = @SoDienThoai WHERE MaNhaCungCap = @MaNhaCungCap`;
            request.input("MaNhaCungCap", mssql_1.default.Int, nhaCungCap.maNhaCungCap);
            request.input("TenNhaCungCap", mssql_1.default.NVarChar, nhaCungCap.tenNhaCungCap);
            request.input("DiaChi", mssql_1.default.NVarChar, nhaCungCap.diaChi);
            request.input("SoDienThoai", mssql_1.default.VarChar, nhaCungCap.soDienThoai);
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
function remove(maNhaCungCap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM NhaCungCap WHERE MaNhaCungCap = @MaNhaCungCap`;
            request.input("MaNhaCungCap", mssql_1.default.Int, maNhaCungCap);
            const result = yield request.query(query);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            pool.close();
        }
    });
}
function getOne(maNhaCungCap) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM NhaCungCap WHERE MaNhaCungCap = @MaNhaCungCap";
            request.input("MaNhaCungCap", mssql_1.default.Int, maNhaCungCap);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new NhaCungCap_1.default(element.MaNhaCungCap, element.TenNhaCungCap, element.DiaChi, element.SoDienThoai));
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
