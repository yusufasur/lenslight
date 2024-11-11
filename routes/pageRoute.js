import express from "express";
import {
  getAboutPage,
  getIndexPage,
  getLoginPage,
  getLogout,
  getRegisterPage,
} from "../controllers/pageController.js";

const router = express.Router();

router.get("/", getIndexPage);
router.get("/about", getAboutPage);
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.get("/logout", getLogout);

export default router;
