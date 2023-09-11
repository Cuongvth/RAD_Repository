import express from "express";
import ChiTietKhoHangService from "../services/ChiTietKhoHangService";
import ChiTietKhoHang from "../models/ChiTietKhoHang";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await ChiTietKhoHangService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maChiTietKhoHang =
    typeof req.query.maChiTietKhoHang === "string"
      ? parseInt(req.query.maChiTietKhoHang)
      : null;

  if (maChiTietKhoHang === null) {
    res.status(500);
    return;
  }

  try {
    const lst = await ChiTietKhoHangService.getOne(maChiTietKhoHang);
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const soLuongTon =
    typeof req.query.soLuongTon === "string"
      ? parseInt(req.query.soLuongTon)
      : null;

  const newChiTietKhoHang = new ChiTietKhoHang(
    0,
    maKhoHang,
    maSanPham,
    soLuongTon
  );

  try {
    await ChiTietKhoHangService.add(newChiTietKhoHang);
    res.json(newChiTietKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maChiTietKhoHang =
    typeof req.query.maChiTietKhoHang === "string"
      ? parseInt(req.query.maChiTietKhoHang)
      : null;
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const soLuongTon =
    typeof req.query.soLuongTon === "string"
      ? parseInt(req.query.soLuongTon)
      : null;

  if (maChiTietKhoHang === null) {
    res.status(500);
    return;
  }

  const newChiTietKhoHang = new ChiTietKhoHang(
    maChiTietKhoHang,
    maKhoHang,
    maSanPham,
    soLuongTon
  );

  try {
    await ChiTietKhoHangService.update(newChiTietKhoHang);
    res.json(newChiTietKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maChiTietKhoHang =
    typeof req.query.maChiTietKhoHang === "string"
      ? parseInt(req.query.maChiTietKhoHang)
      : null;

  try {
    if (maChiTietKhoHang !== null) {
      await ChiTietKhoHangService.remove(maChiTietKhoHang);
    }
    res.json(maChiTietKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
