import User from "../models/User.js";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).render("users", { users, currentPage: "users" });
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

    res.status(200).render("user", { user, currentPage: "users" });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
};

export { createUser, getAllUsers, getAUser };
