import SanPham from "../models/SanPham";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM SanPham";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new SanPham(
          element.MaSanPham,
          element.TenSanPham,
          element.DonViTinh,
          element.GiaNhap,
          element.GiaBan,
          element.MaNhaCungCap
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(sanPham: SanPham) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO SanPham (TenSanPham, DonViTinh, GiaNhap, GiaBan, MaNhaCungCap) 
                   VALUES (@TenSanPham, @DonViTinh, @GiaNhap, @GiaBan, @MaNhaCungCap)`;

    request.input("TenSanPham", sql.NVarChar, sanPham.tenSanPham);
    request.input("DonViTinh", sql.NVarChar, sanPham.donViTinh);
    request.input("GiaNhap", sql.Decimal, sanPham.giaNhap);
    request.input("GiaBan", sql.Decimal, sanPham.giaBan);
    request.input("MaNhaCungCap", sql.Int, sanPham.maNhaCungCap);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(sanPham: SanPham) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE SanPham 
                   SET TenSanPham = @TenSanPham, DonViTinh = @DonViTinh, GiaNhap = @GiaNhap, 
                       GiaBan = @GiaBan, MaNhaCungCap = @MaNhaCungCap 
                   WHERE MaSanPham = @MaSanPham`;

    request.input("MaSanPham", sql.Int, sanPham.maSanPham);
    request.input("TenSanPham", sql.NVarChar, sanPham.tenSanPham);
    request.input("DonViTinh", sql.NVarChar, sanPham.donViTinh);
    request.input("GiaNhap", sql.Decimal, sanPham.giaNhap);
    request.input("GiaBan", sql.Decimal, sanPham.giaBan);
    request.input("MaNhaCungCap", sql.Int, sanPham.maNhaCungCap);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maSanPham: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM SanPham WHERE MaSanPham = @MaSanPham`;

    request.input("MaSanPham", sql.Int, maSanPham);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maSanPham: number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM SanPham WHERE MaSanPham = @MaSanPham";

    request.input("MaSanPham", sql.Int, maSanPham);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new SanPham(
          element.MaSanPham,
          element.TenSanPham,
          element.DonViTinh,
          element.GiaNhap,
          element.GiaBan,
          element.MaNhaCungCap
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
