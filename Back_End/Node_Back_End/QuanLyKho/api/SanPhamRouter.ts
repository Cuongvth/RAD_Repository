import express from "express";
import SanPhamService from "../services/SanPhamService";
import SanPham from "../models/SanPham";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await SanPhamService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;

  if (maSanPham === null) {
    res.status(500);
    return;
  }

  try {
    const sanPham = await SanPhamService.getOne(maSanPham);
    res.json(sanPham);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const tenSanPham = req.query.tenSanPham;
  const donViTinh = req.query.donViTinh;
  const giaNhap =
    typeof req.query.giaNhap === "string" ? parseInt(req.query.giaNhap) : null;
  const giaBan =
    typeof req.query.giaBan === "string" ? parseInt(req.query.giaBan) : null;
  const maNhaCungCap =
    typeof req.query.maNhaCungCap === "string"
      ? parseInt(req.query.maNhaCungCap)
      : null;

  const newSanPham = new SanPham(
    0,
    typeof tenSanPham === "string" ? tenSanPham : null,
    typeof donViTinh === "string" ? donViTinh : null,
    giaNhap,
    giaBan,
    maNhaCungCap
  );

  try {
    await SanPhamService.add(newSanPham);
    res.json(newSanPham);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;
  const tenSanPham = req.query.tenSanPham;
  const donViTinh = req.query.donViTinh;
  const giaNhap =
    typeof req.query.giaNhap === "string" ? parseInt(req.query.giaNhap) : null;
  const giaBan =
    typeof req.query.giaBan === "string" ? parseInt(req.query.giaBan) : null;
  const maNhaCungCap =
    typeof req.query.maNhaCungCap === "string"
      ? parseInt(req.query.maNhaCungCap)
      : null;

  if (maSanPham === null) {
    res.status(500);
    return;
  }

  const updatedSanPham = new SanPham(
    maSanPham,
    typeof tenSanPham === "string" ? tenSanPham : null,
    typeof donViTinh === "string" ? donViTinh : null,
    giaNhap,
    giaBan,
    maNhaCungCap
  );

  try {
    await SanPhamService.update(updatedSanPham);
    res.json(updatedSanPham);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maSanPham =
    typeof req.query.maSanPham === "string"
      ? parseInt(req.query.maSanPham)
      : null;

  try {
    if (maSanPham !== null) {
      await SanPhamService.remove(maSanPham);
    }
    res.json(maSanPham);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
