import NhaCungCap from "../models/NhaCungCap";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM NhaCungCap";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new NhaCungCap(
          element.MaNhaCungCap,
          element.TenNhaCungCap,
          element.DiaChi,
          element.SoDienThoai
        )
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(nhaCungCap : NhaCungCap) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO NhaCungCap (TenNhaCungCap, DiaChi, SoDienThoai) VALUES (@TenNhaCungCap, @DiaChi, @SoDienThoai)`;

    request.input("TenNhaCungCap", sql.NVarChar, nhaCungCap.tenNhaCungCap);
    request.input("DiaChi", sql.NVarChar, nhaCungCap.diaChi);
    request.input("SoDienThoai", sql.VarChar, nhaCungCap.soDienThoai);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(nhaCungCap : NhaCungCap) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE NhaCungCap SET TenNhaCungCap = @TenNhaCungCap, DiaChi = @DiaChi, SoDienThoai = @SoDienThoai WHERE MaNhaCungCap = @MaNhaCungCap`;

    request.input("MaNhaCungCap", sql.Int, nhaCungCap.maNhaCungCap);
    request.input("TenNhaCungCap", sql.NVarChar, nhaCungCap.tenNhaCungCap);
    request.input("DiaChi", sql.NVarChar, nhaCungCap.diaChi);
    request.input("SoDienThoai", sql.VarChar, nhaCungCap.soDienThoai);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maNhaCungCap : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM NhaCungCap WHERE MaNhaCungCap = @MaNhaCungCap`;

    request.input("MaNhaCungCap", sql.Int, maNhaCungCap);

    const result = await request.query(query);
  } catch (err) {
    console.log(err);
    
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maNhaCungCap : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM NhaCungCap WHERE MaNhaCungCap = @MaNhaCungCap";

    request.input("MaNhaCungCap", sql.Int, maNhaCungCap);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new NhaCungCap(
          element.MaNhaCungCap,
          element.TenNhaCungCap,
          element.DiaChi,
          element.SoDienThoai
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
