import express from "express";
import ChiTietPhieuNhapService from "../services/ChiTietPhieuNhapService";
import ChiTietPhieuNhap from "../models/ChiTietPhieuNhap";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await ChiTietPhieuNhapService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maChiTietPhieuNhap =
    typeof req.query.maChiTietPhieuNhap === "string"
      ? parseInt(req.query.maChiTietPhieuNhap)
      : null;

  if (maChiTietPhieuNhap === null) {
    res.status(500);
    return;
  }

  try {
    const lst = await ChiTietPhieuNhapService.getOne(maChiTietPhieuNhap);
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const maPhieuNhap =
    typeof req.query.maPhieuNhap === "string"
      ? parseInt(req.query.maPhieuNhap)
      : null;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const soLuongNhap =
    typeof req.query.soLuongNhap === "string"
      ? parseInt(req.query.soLuongNhap)
      : null;

  const newChiTietPhieuNhap = new ChiTietPhieuNhap(
    0,
    maPhieuNhap,
    maSanPham,
    soLuongNhap
  );

  try {
    await ChiTietPhieuNhapService.add(newChiTietPhieuNhap);
    res.json(newChiTietPhieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maChiTietPhieuNhap =
    typeof req.query.maChiTietPhieuNhap === "string"
      ? parseInt(req.query.maChiTietPhieuNhap)
      : null;
  const maPhieuNhap =
    typeof req.query.maPhieuNhap === "string"
      ? parseInt(req.query.maPhieuNhap)
      : null;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const soLuongNhap =
    typeof req.query.soLuongNhap === "string"
      ? parseInt(req.query.soLuongNhap)
      : null;

  if (maChiTietPhieuNhap === null) {
    res.status(500);
    return;
  }

  const newChiTietPhieuNhap = new ChiTietPhieuNhap(
    maChiTietPhieuNhap,
    maPhieuNhap,
    maSanPham,
    soLuongNhap
  );

  try {
    await ChiTietPhieuNhapService.update(newChiTietPhieuNhap);
    res.json(newChiTietPhieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maChiTietPhieuNhap =
    typeof req.query.maChiTietPhieuNhap === "string"
      ? parseInt(req.query.maChiTietPhieuNhap)
      : null;

  try {
    if (maChiTietPhieuNhap !== null) {
      await ChiTietPhieuNhapService.remove(maChiTietPhieuNhap);
    }
    res.json(maChiTietPhieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
