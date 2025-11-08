const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../config/passport");
const {
  signUpNewUser,
  signIn,
  verifyAuth,
  googleCallback,
  logout,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/signup", signUpNewUser);
router.post("/signin", signIn);
router.get("/verify-me", verifyToken, verifyAuth);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback
);

router.post("/logout", verifyToken, logout);

module.exports = router;
