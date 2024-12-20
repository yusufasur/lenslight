import User from "../models/User.js";
import Photo from "../models/Photo.js";
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

    console.log(err);

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

const getDashboardPage = async (req, res) => {
  const photos = await Photo.find({ user: res.locals.user._id });
  const user = await User.findById(res.locals.user._id).populate([
    "followings",
    "followers",
  ]);

  res.render("dashboard", {
    currentPage: "dashboard",
    photos,
    user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: res.locals.user._id } });

    res.status(200).render("users", {
      users,
      currentPage: "users",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const getAUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const inFollowers = user.followers.some((follower) =>
      follower.equals(res.locals.user._id)
    );

    const photos = await Photo.find({ user: user._id });

    res.status(200).render("user", {
      user,
      photos,
      currentPage: "user",
      inFollowers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const follow = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { followers: res.locals.user._id },
      },
      { new: true }
    );

    user = await User.findByIdAndUpdate(
      res.locals.user._id,
      {
        $push: { followings: req.params.id },
      },
      { new: true }
    );

    res.status(200).redirect(`/users/${req.params.id}`);
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const unFollow = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { followers: res.locals.user._id },
      },
      { new: true }
    );

    user = await User.findByIdAndUpdate(
      res.locals.user._id,
      {
        $pull: { followings: req.params.id },
      },
      { new: true }
    );

    res.status(200).redirect(`/users/${req.params.id}`);
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

export {
  createUser,
  loginUser,
  getDashboardPage,
  getAUser,
  getAllUsers,
  follow,
  unFollow,
};
