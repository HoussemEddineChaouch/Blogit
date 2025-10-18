const express = require("express");
const {
  SendOtp,
  verifyOtp,
  resetPassword,
} = require("../controllers/resetPasswordController");
const { verifyTokenParams } = require("../middlewares/verifyToken");
const { getEmailFromCookie } = require("../middlewares/getEmailFromCookie");

const router = express.Router();

router.post("/send-otp", SendOtp);
router.post("/verify-otp", getEmailFromCookie, verifyOtp);
router.post("/reset-password", verifyTokenParams, resetPassword);

module.exports = router;
