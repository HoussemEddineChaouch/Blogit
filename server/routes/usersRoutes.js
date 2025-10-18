const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUserRank,
  updateProfile,
  deleteAccount,
} = require("../controllers/usersController");
const { verifyToken } = require("../middlewares/verifyToken");
const pictureUpload = require("../middlewares/PictureUpload");

router.get("/profile", verifyToken, getUserProfile);
router.get("/rank", verifyToken, getUserRank);
router.put(
  "/update-profile",
  verifyToken,
  pictureUpload.single("avatarUrl"),
  updateProfile
);
router.delete("/delete", verifyToken, deleteAccount);

module.exports = router;
