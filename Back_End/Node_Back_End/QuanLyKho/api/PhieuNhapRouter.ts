import express from "express";
import PhieuNhapService from "../services/PhieuNhapService";
import PhieuNhap from "../models/PhieuNhap";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await PhieuNhapService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maPhieuNhap =
    typeof req.query.maPhieuNhap === "string"
      ? parseInt(req.query.maPhieuNhap)
      : null;

  if (maPhieuNhap === null) {
    res.status(500);
    return;
  }

  try {
    const phieuNhap = await PhieuNhapService.getOne(maPhieuNhap);
    res.json(phieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const ngayNhap = req.query.ngayNhap;
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;

  const newPhieuNhap = new PhieuNhap(
    0,
    typeof ngayNhap === "string" ? new Date(ngayNhap) : null,
    maNhanVien,
    maKhoHang
  );

  try {
    await PhieuNhapService.add(newPhieuNhap);
    res.json(newPhieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maPhieuNhap =
    typeof req.query.maPhieuNhap === "string"
      ? parseInt(req.query.maPhieuNhap)
      : null;
  const ngayNhap = req.query.ngayNhap;
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;

  if (maPhieuNhap === null) {
    res.status(500);
    return;
  }

  const updatedPhieuNhap = new PhieuNhap(
    maPhieuNhap,
    typeof ngayNhap === "string" ? new Date(ngayNhap) : null,
    maNhanVien,
    maKhoHang
  );

  try {
    await PhieuNhapService.update(updatedPhieuNhap);
    res.json(updatedPhieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maPhieuNhap =
    typeof req.query.maPhieuNhap === "string"
      ? parseInt(req.query.maPhieuNhap)
      : null;

  try {
    if (maPhieuNhap !== null) {
      await PhieuNhapService.remove(maPhieuNhap);
    }
    res.json(maPhieuNhap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/nhapkho", async (req, res) => {
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;
  const maKhoHang =
    typeof req.query.maKhoHang === "string"
      ? parseInt(req.query.maKhoHang)
      : null;
  const chiTietPhieuNhap =
    typeof req.query.chiTietPhieuNhap === "string"
      ? req.query.chiTietPhieuNhap
      : null;

  try {
    await PhieuNhapService.nhapKho(maNhanVien, maKhoHang, chiTietPhieuNhap);
    res.json(maKhoHang);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
