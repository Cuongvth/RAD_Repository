import express from "express";
import NhanVienService from "../services/NhanVienService";
import NhanVien from "../models/NhanVien";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await NhanVienService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;

  if (maNhanVien === null) {
    res.status(500);
    return;
  }

  try {
    const nhanVien = await NhanVienService.getOne(maNhanVien);
    res.json(nhanVien);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const ho = req.query.ho;
  const ten = req.query.ten;
  const gioiTinh = req.query.gioiTinh;
  const ngaySinh = req.query.ngaySinh;
  const diaChi = req.query.diaChi;

  const newNhanVien = new NhanVien(
    0,
    typeof ho === "string" ? ho : null,
    typeof ten === "string" ? ten : null,
    typeof gioiTinh === "string" ? (gioiTinh === "true" ? true : false) : null,
    typeof ngaySinh === "string" ? new Date(ngaySinh) : null,
    typeof diaChi === "string" ? diaChi : null
  );

  try {
    await NhanVienService.add(newNhanVien);
    res.json(newNhanVien);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;
  const ho = req.query.ho;
  const ten = req.query.ten;
  const gioiTinh = req.query.gioiTinh;
  const ngaySinh = req.query.ngaySinh;
  const diaChi = req.query.diaChi;

  if (maNhanVien === null) {
    res.status(500);
    return;
  }

  const updatedNhanVien = new NhanVien(
    maNhanVien,
    typeof ho === "string" ? ho : null,
    typeof ten === "string" ? ten : null,
    typeof gioiTinh === "string" ? (gioiTinh === "true" ? true : false) : null,
    typeof ngaySinh === "string" ? new Date(ngaySinh) : null,
    typeof diaChi === "string" ? diaChi : null
  );

  try {
    await NhanVienService.update(updatedNhanVien);
    res.json(updatedNhanVien);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;

  try {
    if (maNhanVien !== null) {
      await NhanVienService.remove(maNhanVien);
    }
    res.json(maNhanVien);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
