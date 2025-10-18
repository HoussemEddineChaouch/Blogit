const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const pictureUpload = require("../middlewares/PictureUpload");
const {
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  toggleLike,
  topBlogs,
  getBlogsList,
  topBloggers,
  getBlogsByCategory,
} = require("../controllers/blogsControllers");
const { validateID } = require("../middlewares/validateObjectId");

router.post(
  "/blogit",
  verifyToken,
  pictureUpload.single("blogImage"),
  createBlog
);

router.get("/list", verifyToken, getBlogsList);
router.put("/like/:id", verifyToken, validateID, toggleLike);
router.get("/top-bloggers", verifyToken, topBloggers);
router.get("/top-blogs", verifyToken, topBlogs);
router.delete("/delete/:id", verifyToken, validateID, deleteBlog);
router.get("/blog/:id", verifyToken, validateID, getSingleBlog);
router.get("/category", verifyToken, getBlogsByCategory);
router.put(
  "/update/:id",
  verifyToken,
  pictureUpload.single("image"),
  validateID,
  updateBlog
);

module.exports = router;
