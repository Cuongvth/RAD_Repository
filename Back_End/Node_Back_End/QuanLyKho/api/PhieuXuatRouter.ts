import express from "express";
import PhieuXuatService from "../services/PhieuXuatService";
import PhieuXuat from "../models/PhieuXuat";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const lst = await PhieuXuatService.getAll();
    res.json(lst);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getone", async (req, res) => {
  const maPhieuXuat =
    typeof req.query.maPhieuXuat === "string"
      ? parseInt(req.query.maPhieuXuat)
      : null;

  if (maPhieuXuat === null) {
    res.status(500);
    return;
  }

  try {
    const phieuXuat = await PhieuXuatService.getOne(maPhieuXuat);
    res.json(phieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const ngayXuat = req.query.ngayXuat;
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;

  const newPhieuXuat = new PhieuXuat(
    0,
    typeof ngayXuat === "string" ? new Date(ngayXuat) : null,
    maNhanVien
  );

  try {
    await PhieuXuatService.add(newPhieuXuat);
    res.json(newPhieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update", async (req, res) => {
  const maPhieuXuat =
    typeof req.query.maPhieuXuat === "string"
      ? parseInt(req.query.maPhieuXuat)
      : null;
  const ngayXuat = req.query.ngayXuat;
  const maNhanVien =
    typeof req.query.maNhanVien === "string"
      ? parseInt(req.query.maNhanVien)
      : null;

  if (maPhieuXuat === null) {
    res.status(500);
    return;
  }

  const updatedPhieuXuat = new PhieuXuat(
    maPhieuXuat,
    typeof ngayXuat === "string" ? new Date(ngayXuat) : null,
    maNhanVien
  );

  try {
    await PhieuXuatService.update(updatedPhieuXuat);
    res.json(updatedPhieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  const maPhieuXuat =
    typeof req.query.maPhieuXuat === "string"
      ? parseInt(req.query.maPhieuXuat)
      : null;

  try {
    if (maPhieuXuat !== null) {
      await PhieuXuatService.remove(maPhieuXuat);
    }
    res.json(maPhieuXuat);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
