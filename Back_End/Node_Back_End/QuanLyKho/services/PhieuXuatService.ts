import PhieuXuat from "../models/PhieuXuat";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM PhieuXuat";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new PhieuXuat(element.MaPhieuXuat, element.NgayXuat, element.MaNhanVien)
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(phieuXuat : PhieuXuat) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO PhieuXuat (NgayXuat, MaNhanVien) 
                   VALUES (@NgayXuat, @MaNhanVien)`;

    request.input("NgayXuat", sql.Date, phieuXuat.ngayXuat);
    request.input("MaNhanVien", sql.Int, phieuXuat.maNhanVien);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(phieuXuat : PhieuXuat) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE PhieuXuat 
                   SET NgayXuat = @NgayXuat, MaNhanVien = @MaNhanVien 
                   WHERE MaPhieuXuat = @MaPhieuXuat`;

    request.input("MaPhieuXuat", sql.Int, phieuXuat.maPhieuXuat);
    request.input("NgayXuat", sql.Date, phieuXuat.ngayXuat);
    request.input("MaNhanVien", sql.Int, phieuXuat.maNhanVien);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maPhieuXuat : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM PhieuXuat WHERE MaPhieuXuat = @MaPhieuXuat`;

    request.input("MaPhieuXuat", sql.Int, maPhieuXuat);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maPhieuXuat : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM PhieuXuat WHERE MaPhieuXuat = @MaPhieuXuat";

    request.input("MaPhieuXuat", sql.Int, maPhieuXuat);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new PhieuXuat(element.MaPhieuXuat, element.NgayXuat, element.MaNhanVien)
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

export default { getAll, add, update, remove, getOne };
