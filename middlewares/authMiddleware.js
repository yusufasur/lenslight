import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token available",
      });
    }

    req.user = await User.findById(
      jwt.verify(token, process.env.JWT_SECRET).userId
    );

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "Not authorized",
    });
  }
};

export { authenticateToken };
