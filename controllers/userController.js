import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      user: user._id,
    });
  } catch (err) {
    let errors = {};

    console.log(err)
    
    if (err.code === 11000) {
      errors.email = "The Email is already registered";
    }

    if (err.name === "ValidationError") {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
    }

    res.status(400).json(errors);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        success: false,
        error: "There is no such user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.redirect("/users/dashboard");
    } else {
      res.status(401).json({
        success: false,
        error: "Password are not matched",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage = (req, res) => {
  res.render("dashboard", {
    currentPage: "dashboard",
  });
};

export { createUser, loginUser, getDashboardPage };
