import express from "express";
import KhoHangService from "../services/KhoHangService";
import KhoHang from "../models/KhoHang";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await KhoHangService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;

  if (maKhoHang === null) {
    res.status(500);
    return;
  }

  try {
    const lst = await KhoHangService.getOne(maKhoHang);
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const diaChi = req.query.diaChi;
  const soDienThoai = req.query.soDienThoai;

  const newKhoHang = new KhoHang(
    0,
    typeof diaChi === "string" ? diaChi : null,
    typeof soDienThoai === "string" ? soDienThoai : null
  );

  try {
    await KhoHangService.add(newKhoHang);
    res.json(newKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;
  const diaChi = req.query.diaChi;
  const soDienThoai = req.query.soDienThoai;

  if (maKhoHang === null) {
    res.status(500);
    return;
  }

  const newKhoHang = new KhoHang(
    maKhoHang,
    typeof diaChi === "string" ? diaChi : null,
    typeof soDienThoai === "string" ? soDienThoai : null
  );

  try {
    await KhoHangService.update(newKhoHang);
    res.json(newKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;

  try {
    if (maKhoHang !== null) {
      await KhoHangService.remove(maKhoHang);
    }
    res.json(maKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
