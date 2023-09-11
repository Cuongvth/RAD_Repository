import PhieuNhap from "../models/PhieuNhap";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM PhieuNhap";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new PhieuNhap(
          element.MaPhieuNhap,
          element.NgayNhap,
          element.MaNhanVien,
          element.MaKhoHang
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(phieuNhap: PhieuNhap) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO PhieuNhap (NgayNhap, MaNhanVien, MaKhoHang) 
                   VALUES (@NgayNhap, @MaNhanVien, @MaKhoHang)`;

    request.input("NgayNhap", sql.Date, phieuNhap.ngayNhap);
    request.input("MaNhanVien", sql.Int, phieuNhap.maNhanVien);
    request.input("MaKhoHang", sql.Int, phieuNhap.maKhoHang);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(phieuNhap: PhieuNhap) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE PhieuNhap 
                   SET NgayNhap = @NgayNhap, MaNhanVien = @MaNhanVien, MaKhoHang = @MaKhoHang
                   WHERE MaPhieuNhap = @MaPhieuNhap`;

    request.input("MaPhieuNhap", sql.Int, phieuNhap.maPhieuNhap);
    request.input("NgayNhap", sql.Date, phieuNhap.ngayNhap);
    request.input("MaNhanVien", sql.Int, phieuNhap.maNhanVien);
    request.input("MaKhoHang", sql.Int, phieuNhap.maKhoHang);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maPhieuNhap: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM PhieuNhap WHERE MaPhieuNhap = @MaPhieuNhap`;

    request.input("MaPhieuNhap", sql.Int, maPhieuNhap);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maPhieuNhap: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM PhieuNhap WHERE MaPhieuNhap = @MaPhieuNhap";

    request.input("MaPhieuNhap", sql.Int, maPhieuNhap);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new PhieuNhap(
          element.MaPhieuNhap,
          element.NgayNhap,
          element.MaNhanVien,
          element.MaKhoHang
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function nhapKho(
  maNhanVien: number | null,
  maKhoHang: number | null,
  chiTietPhieuNhap: string | null
) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `EXEC NhapKho ${maNhanVien}, ${maKhoHang}, ${chiTietPhieuNhap}`;

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

export default { getAll, add, update, remove, getOne, nhapKho };
