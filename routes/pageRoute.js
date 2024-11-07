import express from "express";
import {
  getAboutPage,
  getIndexPage,
  getLoginPage,
  getRegisterPage,
} from "../controllers/pageController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getIndexPage);
router.get("/about", getAboutPage);
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);

export default router;
