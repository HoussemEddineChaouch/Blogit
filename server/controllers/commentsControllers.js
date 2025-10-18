const { Blog } = require("../models/Blog");
const { Comment, validationCreateComment } = require("../models/Comment");

/**----------------------------- 
   @desc        Add comment form specific user to specific blog
   @router      /Blogit/apiv1/blogs/comments/create
   @method      POST
   @access      private (only user himself)
  ------------------------------*/

async function createComment(req, res) {
  try {
    const { error } = validationCreateComment(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { id } = req.params;
    await Comment.create({
      blogId: id,
      user: req.user.id,
      text: req.body.comment,
    });

    res.status(201).json({ message: "Your comment was blog successfully!" });
  } catch (error) {
    console.error;
  }
}

/**----------------------------- 
   @desc        get comments for specific blog
   @router      /Blogit/apiv1/blogs/comments/all
   @method      GET
   @access      private (only user himself)
  ------------------------------*/

async function getComments(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comments = await Comment.find({ blogId: id })
      .select("text createdAt")
      .populate("user", "username avatarUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching comments" });
  }
}

module.exports = {
  createComment,
  getComments,
};
