import express from "express";
import {
  createUser,
  loginUser,
  getDashboardPage,
  getAllUsers,
  getAUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateToken, getDashboardPage);
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getAUser);

export default router;
