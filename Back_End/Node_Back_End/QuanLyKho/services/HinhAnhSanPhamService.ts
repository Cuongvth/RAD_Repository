import HinhAnhSanPham from "../models/HinhAnhSanPham";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM HinhAnhSanPham";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new HinhAnhSanPham(
          element.MaHinhAnh,
          element.DuongDan,
          element.MaSanPham
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(hinhAnhSanPham: HinhAnhSanPham) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO HinhAnhSanPham (DuongDan, MaSanPham) 
                   VALUES (@DuongDan, @MaSanPham)`;

    request.input("DuongDan", sql.VarChar(255), hinhAnhSanPham.duongDan);
    request.input("MaSanPham", sql.Int, hinhAnhSanPham.maSanPham);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(hinhAnhSanPham: HinhAnhSanPham) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE HinhAnhSanPham 
                   SET DuongDan = @DuongDan, MaSanPham = @MaSanPham 
                   WHERE MaHinhAnh = @MaHinhAnh`;

    request.input("MaHinhAnh", sql.Int, hinhAnhSanPham.maHinhAnh);
    request.input("DuongDan", sql.VarChar(255), hinhAnhSanPham.duongDan);
    request.input("MaSanPham", sql.Int, hinhAnhSanPham.maSanPham);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maHinhAnh: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM HinhAnhSanPham WHERE MaHinhAnh = @MaHinhAnh`;

    request.input("MaHinhAnh", sql.Int, maHinhAnh);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maHinhAnh: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM HinhAnhSanPham WHERE MaHinhAnh = @MaHinhAnh";

    request.input("MaHinhAnh", sql.Int, maHinhAnh);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new HinhAnhSanPham(
          element.MaHinhAnh,
          element.DuongDan,
          element.MaSanPham
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
