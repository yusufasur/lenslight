import express from "express";
import {
  createPhoto,
  getAllPhotos,
  getAPhoto,
} from "../controllers/photoController.js";

const router = express.Router();

router.route("/").get(getAllPhotos).post(createPhoto);
router.get("/:id", getAPhoto);

export default router;
