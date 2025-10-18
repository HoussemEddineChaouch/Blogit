const express = require("express");
const correctContent = require("../controllers/geminiControllers");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/correct", verifyToken, correctContent);

module.exports = router;
