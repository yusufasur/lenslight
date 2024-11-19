import express from "express";
import {
  createUser,
  loginUser,
  getDashboardPage,
  getAllUsers,
  getAUser,
  follow,
  unFollow,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateToken, getDashboardPage);
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getAUser);
router.put("/:id/follow", authenticateToken, follow);
router.put("/:id/unfollow", authenticateToken, unFollow);

export default router;
