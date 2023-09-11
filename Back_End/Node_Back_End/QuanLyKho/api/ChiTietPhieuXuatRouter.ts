import express from "express";
import ChiTietPhieuXuatService from "../services/ChiTietPhieuXuatService";
import ChiTietPhieuXuat from "../models/ChiTietPhieuXuat";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await ChiTietPhieuXuatService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maChiTietPhieuXuat =
    typeof req.query.maChiTietPhieuXuat === "string"
      ? parseInt(req.query.maChiTietPhieuXuat)
      : null;

  if (maChiTietPhieuXuat === null) {
    res.status(500);
    return;
  }

  try {
    const lst = await ChiTietPhieuXuatService.getOne(maChiTietPhieuXuat);
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const maPhieuXuat =
    typeof req.query.maPhieuXuat === "string"
      ? parseInt(req.query.maPhieuXuat)
      : null;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const soLuongXuat =
    typeof req.query.soLuongXuat === "string"
      ? parseInt(req.query.soLuongXuat)
      : null;

  const newChiTietPhieuXuat = new ChiTietPhieuXuat(
    0,
    maPhieuXuat,
    maSanPham,
    soLuongXuat
  );

  try {
    await ChiTietPhieuXuatService.add(newChiTietPhieuXuat);
    res.json(newChiTietPhieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maChiTietPhieuXuat =
    typeof req.query.maChiTietPhieuXuat === "string"
      ? parseInt(req.query.maChiTietPhieuXuat)
      : null;
  const maPhieuXuat =
    typeof req.query.maPhieuXuat === "string"
      ? parseInt(req.query.maPhieuXuat)
      : null;
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const soLuongXuat =
    typeof req.query.soLuongXuat === "string"
      ? parseInt(req.query.soLuongXuat)
      : null;

  if (maChiTietPhieuXuat === null) {
    res.status(500);
    return;
  }

  const newChiTietPhieuXuat = new ChiTietPhieuXuat(
    maChiTietPhieuXuat,
    maPhieuXuat,
    maSanPham,
    soLuongXuat
  );

  try {
    await ChiTietPhieuXuatService.update(newChiTietPhieuXuat);
    res.json(newChiTietPhieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maChiTietPhieuXuat =
    typeof req.query.maChiTietPhieuXuat === "string"
      ? parseInt(req.query.maChiTietPhieuXuat)
      : null;

  try {
    if (maChiTietPhieuXuat !== null) {
      await ChiTietPhieuXuatService.remove(maChiTietPhieuXuat);
    }
    res.json(maChiTietPhieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
