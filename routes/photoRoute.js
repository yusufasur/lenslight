import express from "express";
import {
  createPhoto,
  getAllPhotos,
  getAPhoto,
  deletePhoto,
  updatePhoto,
} from "../controllers/photoController.js";

const router = express.Router();

router.route("/").get(getAllPhotos).post(createPhoto);
router.get("/:id", getAPhoto);
router.delete("/:id", deletePhoto);
router.put("/:id", updatePhoto);

export default router;
