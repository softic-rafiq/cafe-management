const express = require("express");
const router = express.Router();

const {
  registerControlelr,
  getUserController,
  loginController,
  forgotPasswordController,
} = require("../controllers/authController");
require("dotenv").config();

// Auth routes
router.post("/signup", registerControlelr);
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

module.exports = router;
