import ChiTietPhieuNhap from "../models/ChiTietPhieuNhap";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM ChiTietPhieuNhap";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new ChiTietPhieuNhap(
          element.MaChiTietPhieuNhap,
          element.MaPhieuNhap,
          element.MaSanPham,
          element.SoLuongNhap
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(chiTietPhieuNhap : ChiTietPhieuNhap) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO ChiTietPhieuNhap (MaPhieuNhap, MaSanPham, SoLuongNhap) 
                   VALUES (@MaPhieuNhap, @MaSanPham, @SoLuongNhap)`;

    request.input("MaPhieuNhap", sql.Int, chiTietPhieuNhap.maPhieuNhap);
    request.input("MaSanPham", sql.Int, chiTietPhieuNhap.maSanPham);
    request.input("SoLuongNhap", sql.Int, chiTietPhieuNhap.soLuongNhap);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(chiTietPhieuNhap : ChiTietPhieuNhap) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE ChiTietPhieuNhap 
                   SET MaPhieuNhap = @MaPhieuNhap, MaSanPham = @MaSanPham, SoLuongNhap = @SoLuongNhap 
                   WHERE MaChiTietPhieuNhap = @MaChiTietPhieuNhap`;

    request.input(
      "MaChiTietPhieuNhap",
      sql.Int,
      chiTietPhieuNhap.maChiTietPhieuNhap
    );
    request.input("MaPhieuNhap", sql.Int, chiTietPhieuNhap.maPhieuNhap);
    request.input("MaSanPham", sql.Int, chiTietPhieuNhap.maSanPham);
    request.input("SoLuongNhap", sql.Int, chiTietPhieuNhap.soLuongNhap);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maChiTietPhieuNhap : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM ChiTietPhieuNhap WHERE MaChiTietPhieuNhap = @MaChiTietPhieuNhap`;

    request.input("MaChiTietPhieuNhap", sql.Int, maChiTietPhieuNhap);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maChiTietPhieuNhap : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query =
      "SELECT * FROM ChiTietPhieuNhap WHERE MaChiTietPhieuNhap = @MaChiTietPhieuNhap";

    request.input("MaChiTietPhieuNhap", sql.Int, maChiTietPhieuNhap);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new ChiTietPhieuNhap(
          element.MaChiTietPhieuNhap,
          element.MaPhieuNhap,
          element.MaSanPham,
          element.SoLuongNhap
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
