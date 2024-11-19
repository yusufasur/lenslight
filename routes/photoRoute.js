import express from "express";
import {
  createPhoto,
  getAllPhotos,
  getAPhoto,
  deletePhoto,
} from "../controllers/photoController.js";

const router = express.Router();

router.route("/").get(getAllPhotos).post(createPhoto);
router.get("/:id", getAPhoto);
router.delete("/:id", deletePhoto);

export default router;
