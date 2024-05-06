const bcryptjs = require("bcryptjs");
const user = require("../models/userModel");
const mongoose = require("mongoose");

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await user.find({ email });
    if (emailExist.length == 0) {
      return res.json({
        msg: "There is no user with this email",
        status: false,
      });
    }
    const comparePassword = bcryptjs.compareSync(
      password,
      emailExist[0].password
    );
    const actual_user = await user.find({ email }).select("-password");
    if (comparePassword) {
      return res.json({ user: actual_user[0], status: true });
    } else {
      return res.json({ msg: "Invalid credentials", status: false });
    }
  } catch (error) {
    next(error);
  }
};
const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExist = user.find({ username });
    if (userExist.length > 0) {
      return res.json({
        msg: "User with the same username already present",
        status: false,
      });
    }
    const emailExist = await user.find({ email });
    if (emailExist.length > 0) {
      return res.json({
        msg: "This email is already choosen",
        status: false,
      });
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const created_user = await user.create({
      username,
      email,
      password: hashedPassword,
    });
    const actual_user = await user.findOne({ email }).select("-password");
    return res.json({ user: actual_user, status: true });
  } catch (error) {
    next(error);
  }
};
const avatarController = async (req, res, next) => {
  try {
    const { id, avatarImg } = req.body;
    // console.log(id);
    if (!avatarImg) {
      return res.json({ msg: "Please select an avatar", status: false });
    }
    const updatedUser = await user.findByIdAndUpdate(id, {
      avatar: avatarImg,
      isAvatar: true,
    });
    const actual_user = await user.findById(id).select("-password");
    res.json({ user: actual_user, status: true });
  } catch (error) {
    next(error);
  }
};
const fetchAllUsers = async (req, res, next) => {
  try {
    const { id } = req.body;
    const allUsers = await user
      .find({ _id: { $ne: new mongoose.Types.ObjectId(id) } })
      .select("-password");
    res.json({ users: allUsers, status: true });

    // console.log(allUsers);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  loginController,
  registerController,
  avatarController,
  fetchAllUsers,
};
