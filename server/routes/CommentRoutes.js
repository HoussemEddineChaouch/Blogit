const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { validateID } = require("../middlewares/validateObjectId");
const {
  createComment,
  getComments,
} = require("../controllers/commentsControllers");

router.post("/add/:id", verifyToken, validateID, createComment);
router.get("/:id", verifyToken, validateID, getComments);

module.exports = router;
