import express from "express";
import { createPhoto, getAllPhotos } from "../controllers/photoController.js";

const router = express.Router();

router.route("/").get(getAllPhotos).post(createPhoto);

export default router;
