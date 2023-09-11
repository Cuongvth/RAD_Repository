import NhanVien from "../models/NhanVien";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM NhanVien";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new NhanVien(
          element.MaNhanVien,
          element.Ho,
          element.Ten,
          element.GioiTinh,
          element.NgaySinh,
          element.DiaChi
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(nhanVien: NhanVien) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO NhanVien (Ho, Ten, GioiTinh, NgaySinh, DiaChi) 
                   VALUES (@Ho, @Ten, @GioiTinh, @NgaySinh, @DiaChi)`;

    request.input("Ho", sql.VarChar(50), nhanVien.ho);
    request.input("Ten", sql.VarChar(50), nhanVien.ten);
    request.input("GioiTinh", sql.Bit, nhanVien.gioiTinh);
    request.input("NgaySinh", sql.Date, nhanVien.ngaySinh);
    request.input("DiaChi", sql.VarChar(255), nhanVien.diaChi);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(nhanVien: NhanVien) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE NhanVien 
                   SET Ho = @Ho, Ten = @Ten, GioiTinh = @GioiTinh, NgaySinh = @NgaySinh, DiaChi = @DiaChi 
                   WHERE MaNhanVien = @MaNhanVien`;

    request.input("MaNhanVien", sql.Int, nhanVien.maNhanVien);
    request.input("Ho", sql.VarChar(50), nhanVien.ho);
    request.input("Ten", sql.VarChar(50), nhanVien.ten);
    request.input("GioiTinh", sql.Bit, nhanVien.gioiTinh);
    request.input("NgaySinh", sql.Date, nhanVien.ngaySinh);
    request.input("DiaChi", sql.VarChar(255), nhanVien.diaChi);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maNhanVien: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM NhanVien WHERE MaNhanVien = @MaNhanVien`;

    request.input("MaNhanVien", sql.Int, maNhanVien);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maNhanVien: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM NhanVien WHERE MaNhanVien = @MaNhanVien";

    request.input("MaNhanVien", sql.Int, maNhanVien);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new NhanVien(
          element.MaNhanVien,
          element.Ho,
          element.Ten,
          element.GioiTinh,
          element.NgaySinh,
          element.DiaChi
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

export default { getAll, add, update, remove, getOne };
