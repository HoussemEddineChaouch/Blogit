const { Blog, validationBlog } = require("../models/Blog");
const { Comment } = require("../models/Comment");
var fs = require("fs");
var path = require("path");

/**----------------------------- 
 @desc        Get list of blogs with its comments
 @router      /blogit/apiv1/blogs/list
 @method      GET
 @access      private (only user)
------------------------------*/

async function getBlogsList(req, res) {
  try {
    const blogs = await Blog.find();

    if (!blogs || blogs.length === 0) {
      return res.status(400).json({ message: "No blogs for now!" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

/**----------------------------- 
 @desc        Create new Blog
 @router      /Blogit/apiv1/blogs/create
 @method      POST
 @access      private (only user)
------------------------------*/

async function createBlog(req, res) {
  try {
    const { error } = validationBlog(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image provided!" });
    }

    const blogCreated = new Blog({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      metaTags: req.body.metaTags || [],
      image: req.file.filename,
      user: req.user.id,
    });

    await blogCreated.save();

    res.status(201).json({
      message: "Blogit successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

/**----------------------------- 
 @desc        Get Single Blogs for specific user
 @router      /Blogit/apiv1/blogs/single/:id
 @method      GET
 @access      private (only user himself)
------------------------------*/

async function getSingleBlog(req, res) {
  try {
    const blogId = req.params.id;
    const singleBlog = await Blog.findById(blogId);

    if (!singleBlog)
      return res.status(400).json({ message: "Oops ! Blog not found" });

    res.status(200).json(singleBlog);
  } catch (error) {
    console.log(error);
  }
}

/**----------------------------- 
 @desc        Delete specific Blog
 @router      /Blogit/apiv1/blogs/deleteBlog/:id
 @method      Delete
 @access      private (only user or admin )
------------------------------*/

async function deleteBlog(req, res) {
  try {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findById(blogId);

    if (!deletedBlog)
      return res.status(400).json({ message: "Oops ! Blog not found." });

    await Blog.findByIdAndDelete(blogId);
    await Comment.deleteMany({ blogId: deletedBlog._id });
    res.status(200).json({
      message: "Blog has been deleted successfully !",
      blogId: deletedBlog._id,
    });
  } catch (error) {
    console.log(error);
  }
}

/**----------------------------- 
 @desc        Update Blog
 @router      /Blogit/apiv1/blogs/update/:id
 @method      PUT
 @access      private (only user)
------------------------------*/

const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, content, category, metaTags } = req.body;

    // Basic field updates
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;

    // Handle tags (stringified once on frontend)
    if (metaTags) {
      try {
        blog.metaTags = Array.isArray(metaTags)
          ? metaTags
          : JSON.parse(metaTags);
      } catch {
        blog.metaTags = [];
      }
    }

    // Handle image upload
    if (req.file) {
      if (blog.image) {
        const oldPath = path.join("../images", req.file.filename);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      blog.image = req.file.filename;
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**----------------------------- 
 @desc        Add like in blog
 @router      /Blogit/apiv1/blogs/like/:id
 @method      PUT
 @access      private (only user)
------------------------------*/

async function toggleLike(req, res) {
  try {
    const loggedUser = req.user.id;
    const { id: blogId } = req.params;
    const { typeLike } = req.body;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    if (!blog[typeLike]) {
      return res
        .status(400)
        .json({ message: `Invalid like type: ${typeLike}` });
    }

    const isAlreadyLiked = blog[typeLike].find(
      (user) => user.toString() === loggedUser
    );

    if (isAlreadyLiked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { [typeLike]: loggedUser } },
        { new: true }
      );
    } else {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { [typeLike]: loggedUser } },
        { new: true }
      );
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**----------------------------- 
 @desc        Get Top 10 blogs based in total reach
 @router      /Blogit/apiv1/blogs/topBlogs
 @method      GET
 @access      public (user and admin)
------------------------------*/

async function topBlogs(req, res) {
  try {
    const topUsers = await Blog.aggregate([
      {
        $group: {
          _id: "$user",
          totalReach: {
            $sum: {
              $add: [
                { $size: "$firesCount" },
                { $size: "$rocketCount" },
                { $size: "$starCount" },
              ],
            },
          },
          blogs: {
            $push: {
              title: "$title",
              category: "$category",
              totalReach: {
                $add: [
                  { $size: "$firesCount" },
                  { $size: "$rocketCount" },
                  { $size: "$starCount" },
                ],
              },
              firesCount: { $size: "$firesCount" },
              rocketCount: { $size: "$rocketCount" },
              starCount: { $size: "$starCount" },
            },
          },
        },
      },
      {
        // Sort the blogs array by totalReach descending for each user
        $addFields: {
          blogs: {
            $sortArray: { input: "$blogs", sortBy: { totalReach: -1 } },
          },
        },
      },
      { $sort: { totalReach: -1 } }, // sort users by totalReach
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 1,
          totalReach: 1,
          blogs: 1,
          userDetails: {
            avatarUrl: 1,
            fullName: "$userDetails.username",
            countryCode: "$userDetails.countryCode",
          },
        },
      },
    ]);

    res.json(topUsers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching top users." });
  }
}

/**----------------------------- 
 @desc        Get Top 10 writes based in total blogs
 @router      /Blogit/apiv1/blogs/topWrites
 @method      GET
 @access      public (user and admin)
------------------------------*/

async function topBloggers(req, res) {
  try {
    const TopBlogsWriter = await Blog.aggregate([
      {
        $group: {
          _id: "$user",
          blogCount: { $sum: 1 },
          totalReach: {
            $sum: {
              $add: [
                { $size: "$firesCount" },
                { $size: "$rocketCount" },
                { $size: "$starCount" },
              ],
            },
          },
        },
      },
      {
        $sort: { blogCount: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 0,
          blogCount: 1,
          totalReach: 1,
          userDetails: {
            username: "$userDetails.username",
            avatarUrl: 1,
            countryCode: "$userDetails.countryCode",
          },
        },
      },
    ]);

    res.json(TopBlogsWriter);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching top users." });
  }
}

async function getBlogsByCategory(req, res) {
  try {
    const { category } = req.query;

    if (!category || category.trim() === "") {
      return res.status(400).json({ message: "Category is required" });
    }

    const blogs = await Blog.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    }).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getBlogsByCategory,
  getBlogsList,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  toggleLike,
  topBlogs,
  topBloggers,
};
