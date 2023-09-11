import KhoHang from "../models/KhoHang";
import configmssql from "../config/configmssql";
import sql from "mssql";

async function getAll() {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM KhoHang";

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new KhoHang(element.MaKhoHang, element.Diachi, element.SoDienThoai)
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function add(khoHang : KhoHang) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `INSERT INTO KhoHang (Diachi, SoDienThoai) 
                   VALUES (@Diachi, @SoDienThoai)`;

    request.input("Diachi", sql.VarChar(255), khoHang.diaChi);
    request.input("SoDienThoai", sql.VarChar(20), khoHang.soDienThoai);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function update(khoHang : KhoHang) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `UPDATE KhoHang 
                   SET Diachi = @Diachi, SoDienThoai = @SoDienThoai 
                   WHERE MaKhoHang = @MaKhoHang`;

    request.input("MaKhoHang", sql.Int, khoHang.maKhoHang);
    request.input("Diachi", sql.VarChar(255), khoHang.diaChi);
    request.input("SoDienThoai", sql.VarChar(20), khoHang.soDienThoai);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function remove(maKhoHang : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = `DELETE FROM KhoHang WHERE MaKhoHang = @MaKhoHang`;

    request.input("MaKhoHang", sql.Int, maKhoHang);

    const result = await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

async function getOne(maKhoHang : number) {
  const pool = await sql.connect(configmssql);
  try {
    const request = pool.request();

    const query = "SELECT * FROM KhoHang WHERE MaKhoHang = @MaKhoHang";

    request.input("MaKhoHang", sql.Int, maKhoHang);

    const result = await request.query(query);

    const lst = result.recordset.map(
      (element) =>
        new KhoHang(element.MaKhoHang, element.Diachi, element.SoDienThoai)
    );

    return lst;
  } catch (err) {
    throw err;
  } finally {
    pool.close();
  }
}

export default { getAll, add, update, remove, getOne };
