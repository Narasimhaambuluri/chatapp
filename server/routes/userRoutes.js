const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
  avatarController,
  fetchAllUsers,
} = require("../controllers/userControllers");

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/setAvatar", avatarController);
router.post("/fetchAllUsers", fetchAllUsers);

module.exports = router;
