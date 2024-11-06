import User from "../models/User.js";
import bcrypt from "bcrypt";

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

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ name: username });

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
      res.status(200).send("You are logged in");
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

export { createUser, loginUser };
