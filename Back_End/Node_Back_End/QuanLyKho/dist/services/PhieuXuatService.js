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
const PhieuXuat_1 = __importDefault(require("../models/PhieuXuat"));
const configmssql_1 = __importDefault(require("../config/configmssql"));
const mssql_1 = __importDefault(require("mssql"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM PhieuXuat";
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new PhieuXuat_1.default(element.MaPhieuXuat, element.NgayXuat, element.MaNhanVien));
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
function add(phieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `INSERT INTO PhieuXuat (NgayXuat, MaNhanVien) 
                   VALUES (@NgayXuat, @MaNhanVien)`;
            request.input("NgayXuat", mssql_1.default.Date, phieuXuat.ngayXuat);
            request.input("MaNhanVien", mssql_1.default.Int, phieuXuat.maNhanVien);
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
function update(phieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `UPDATE PhieuXuat 
                   SET NgayXuat = @NgayXuat, MaNhanVien = @MaNhanVien 
                   WHERE MaPhieuXuat = @MaPhieuXuat`;
            request.input("MaPhieuXuat", mssql_1.default.Int, phieuXuat.maPhieuXuat);
            request.input("NgayXuat", mssql_1.default.Date, phieuXuat.ngayXuat);
            request.input("MaNhanVien", mssql_1.default.Int, phieuXuat.maNhanVien);
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
function remove(maPhieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = `DELETE FROM PhieuXuat WHERE MaPhieuXuat = @MaPhieuXuat`;
            request.input("MaPhieuXuat", mssql_1.default.Int, maPhieuXuat);
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
function getOne(maPhieuXuat) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield mssql_1.default.connect(configmssql_1.default);
        try {
            const request = pool.request();
            const query = "SELECT * FROM PhieuXuat WHERE MaPhieuXuat = @MaPhieuXuat";
            request.input("MaPhieuXuat", mssql_1.default.Int, maPhieuXuat);
            const result = yield request.query(query);
            const lst = result.recordset.map((element) => new PhieuXuat_1.default(element.MaPhieuXuat, element.NgayXuat, element.MaNhanVien));
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
