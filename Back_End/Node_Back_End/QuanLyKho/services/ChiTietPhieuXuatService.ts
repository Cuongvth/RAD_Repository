import ChiTietPhieuXuat from "../models/ChiTietPhieuXuat";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM ChiTietPhieuXuat";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new ChiTietPhieuXuat(
          element.MaChiTietPhieuXuat,
          element.MaPhieuXuat,
          element.MaSanPham,
          element.SoLuongXuat
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(chiTietPhieuXuat : ChiTietPhieuXuat) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO ChiTietPhieuXuat (MaPhieuXuat, MaSanPham, SoLuongXuat) 
                   VALUES (@MaPhieuXuat, @MaSanPham, @SoLuongXuat)`;

    request.input("MaPhieuXuat", sql.Int, chiTietPhieuXuat.maPhieuXuat);
    request.input("MaSanPham", sql.Int, chiTietPhieuXuat.maSanPham);
    request.input("SoLuongXuat", sql.Int, chiTietPhieuXuat.soLuongXuat);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(chiTietPhieuXuat : ChiTietPhieuXuat) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE ChiTietPhieuXuat 
                   SET MaPhieuXuat = @MaPhieuXuat, MaSanPham = @MaSanPham, SoLuongXuat = @SoLuongXuat 
                   WHERE MaChiTietPhieuXuat = @MaChiTietPhieuXuat`;

    request.input(
      "MaChiTietPhieuXuat",
      sql.Int,
      chiTietPhieuXuat.maChiTietPhieuXuat
    );
    request.input("MaPhieuXuat", sql.Int, chiTietPhieuXuat.maPhieuXuat);
    request.input("MaSanPham", sql.Int, chiTietPhieuXuat.maSanPham);
    request.input("SoLuongXuat", sql.Int, chiTietPhieuXuat.soLuongXuat);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maChiTietPhieuXuat : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM ChiTietPhieuXuat WHERE MaChiTietPhieuXuat = @MaChiTietPhieuXuat`;

    request.input("MaChiTietPhieuXuat", sql.Int, maChiTietPhieuXuat);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maChiTietPhieuXuat : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query =
      "SELECT * FROM ChiTietPhieuXuat WHERE MaChiTietPhieuXuat = @MaChiTietPhieuXuat";

    request.input("MaChiTietPhieuXuat", sql.Int, maChiTietPhieuXuat);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new ChiTietPhieuXuat(
          element.MaChiTietPhieuXuat,
          element.MaPhieuXuat,
          element.MaSanPham,
          element.SoLuongXuat
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
