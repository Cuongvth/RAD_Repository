import express from "express";
import HinhAnhSanPhamService from "../services/HinhAnhSanPhamService";
import HinhAnhSanPham from "../models/HinhAnhSanPham";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await HinhAnhSanPhamService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maHinhAnh =
    typeof req.query.maHinhAnh === "string"
      ? parseInt(req.query.maHinhAnh)
      : null;

  if (maHinhAnh === null) {
    res.status(500);
    return;
  }

  try {
    const lst = await HinhAnhSanPhamService.getOne(maHinhAnh);
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const duongDan = req.query.duongDan;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;

  const newHinhAnhSanPham = new HinhAnhSanPham(
    0,
    typeof duongDan === "string" ? duongDan : null,
    maSanPham
  );

  try {
    await HinhAnhSanPhamService.add(newHinhAnhSanPham);
    res.json(newHinhAnhSanPham);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maHinhAnh =
    typeof req.query.maHinhAnh === "string"
      ? parseInt(req.query.maHinhAnh)
      : null;
  const duongDan = req.query.duongDan;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;

  if (maHinhAnh === null) {
    res.status(500);
    return;
  }

  const newHinhAnhSanPham = new HinhAnhSanPham(
    maHinhAnh,
    typeof duongDan === "string" ? duongDan : null,
    maSanPham
  );

  try {
    await HinhAnhSanPhamService.update(newHinhAnhSanPham);
    res.json(newHinhAnhSanPham);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maHinhAnh =
    typeof req.query.maHinhAnh === "string"
      ? parseInt(req.query.maHinhAnh)
      : null;

  try {
    if (maHinhAnh !== null) {
      await HinhAnhSanPhamService.remove(maHinhAnh);
    }
    res.json(maHinhAnh);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
