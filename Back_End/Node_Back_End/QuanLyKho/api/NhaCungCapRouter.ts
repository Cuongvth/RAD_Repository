import express from "express";
const router = express.Router();
import NhaCungCapService from "../services/NhaCungCapService";
import NhaCungCap from "../models/NhaCungCap";

router.get("/getall", async (req, res) => {
  try {
    const lst = await NhaCungCapService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maNhaCungCap =
    typeof req.query.maNhaCungCap === "string"
      ? parseInt(req.query.maNhaCungCap)
      : null;

  if (maNhaCungCap === null) {
    res.status(500);
    return;
  }

  try {
    const lst = await NhaCungCapService.getOne(maNhaCungCap);
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const tenNhaCungCap = req.query.tenNhaCungCap;
  const diaChi = req.query.diaChi;
  const soDienThoai = req.query.soDienThoai;

  const newNhaCungCap = new NhaCungCap(
    0,
    typeof tenNhaCungCap === "string" ? tenNhaCungCap : null,
    typeof diaChi === "string" ? diaChi : null,
    typeof soDienThoai === "string" ? soDienThoai : null
  );

  try {
    await NhaCungCapService.add(newNhaCungCap);
    res.json(newNhaCungCap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maNhaCungCap =
    typeof req.query.maNhaCungCap === "string"
      ? parseInt(req.query.maNhaCungCap)
      : null;
  const tenNhaCungCap = req.query.tenNhaCungCap;
  const diaChi = req.query.diaChi;
  const soDienThoai = req.query.soDienThoai;

  if (maNhaCungCap === null) {
    res.status(500);
    return;
  }

  const newNhaCungCap = new NhaCungCap(
    maNhaCungCap,
    typeof tenNhaCungCap === "string" ? tenNhaCungCap : null,
    typeof diaChi === "string" ? diaChi : null,
    typeof soDienThoai === "string" ? soDienThoai : null
  );

  try {
    await NhaCungCapService.update(newNhaCungCap);
    res.json(newNhaCungCap);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maNhaCungCap =
    typeof req.query.maNhaCungCap === "string"
      ? parseInt(req.query.maNhaCungCap)
      : null;

  try {
    if (maNhaCungCap !== null) {
      await NhaCungCapService.remove(maNhaCungCap);
    }
    res.json(maNhaCungCap);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
