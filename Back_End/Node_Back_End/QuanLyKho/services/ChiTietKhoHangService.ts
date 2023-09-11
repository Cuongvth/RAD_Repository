import ChiTietKhoHang from "../models/ChiTietKhoHang";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM ChiTietKhoHang";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new ChiTietKhoHang(
          element.MaChiTietKhoHang,
          element.MaKhoHang,
          element.MaSanPham,
          element.SoLuongTon
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(chiTietKhoHang : ChiTietKhoHang) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO ChiTietKhoHang (MaKhoHang, MaSanPham, SoLuongTon) 
                   VALUES (@MaKhoHang, @MaSanPham, @SoLuongTon)`;

    request.input("MaKhoHang", sql.Int, chiTietKhoHang.maKhoHang);
    request.input("MaSanPham", sql.Int, chiTietKhoHang.maSanPham);
    request.input("SoLuongTon", sql.Int, chiTietKhoHang.soLuongTon);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(chiTietKhoHang : ChiTietKhoHang) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE ChiTietKhoHang 
                   SET MaKhoHang = @MaKhoHang, MaSanPham = @MaSanPham, SoLuongTon = @SoLuongTon 
                   WHERE MaChiTietKhoHang = @MaChiTietKhoHang`;

    request.input("MaChiTietKhoHang", sql.Int, chiTietKhoHang.maChiTietKhoHang);
    request.input("MaKhoHang", sql.Int, chiTietKhoHang.maKhoHang);
    request.input("MaSanPham", sql.Int, chiTietKhoHang.maSanPham);
    request.input("SoLuongTon", sql.Int, chiTietKhoHang.soLuongTon);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maChiTietKhoHang : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM ChiTietKhoHang WHERE MaChiTietKhoHang = @MaChiTietKhoHang`;

    request.input("MaChiTietKhoHang", sql.Int, maChiTietKhoHang);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maChiTietKhoHang : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query =
      "SELECT * FROM ChiTietKhoHang WHERE MaChiTietKhoHang = @MaChiTietKhoHang";

    request.input("MaChiTietKhoHang", sql.Int, maChiTietKhoHang);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new ChiTietKhoHang(
          element.MaChiTietKhoHang,
          element.MaKhoHang,
          element.MaSanPham,
          element.SoLuongTon
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
