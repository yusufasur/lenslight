import express from "express";
import {
  createUser,
  loginUser,
  getDashboardPage,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateToken, getDashboardPage);

export default router;
