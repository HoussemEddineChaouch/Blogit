const { User, ValidationUpdateProfile } = require("../models/User");
const { Blog } = require("../models/Blog");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var fs = require("fs");
var path = require("path");

/**----------------------------- 
 @desc        Get Specific user profile
 @router      /Blogit/apiv1/users-specificProfile/:id
 @method      GET
 @access      private 
------------------------------*/

async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("username avatarUrl createdAt countryCode")
      .populate({
        path: "blogs",
        options: { sort: { createdAt: -1 } },
      })
      .select("-password");

    let fires = 0;
    let rockets = 0;
    let stars = 0;

    if (!user) {
      res.status(404).json({ message: "User Not Found !" });
    } else {
      blogsCount = user.blogs.length;
      user.blogs.map((blog) => {
        fires += blog.firesCount.length;
        rockets += blog.rocketCount.length;
        stars += blog.starCount.length;
      });
    }

    const data = { user, listCount: [fires, rockets, stars, blogsCount] };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

/**----------------------------- 
 @desc        Update user profile
 @router      /Blogit/apiv1/users-updateProfile/:id
 @method      PATCH
 @access      private 
------------------------------*/

async function updateProfileUser(req, res) {
  const { error } = ValidationUpdateProfile();
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
}

async function getUserRank(req, res) {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const rankedUsers = await Blog.aggregate([
      {
        $group: {
          _id: "$user",
          totalReach: {
            $sum: {
              $add: [
                { $size: { $ifNull: ["$firesCount", []] } },
                { $size: { $ifNull: ["$rocketCount", []] } },
                { $size: { $ifNull: ["$starCount", []] } },
              ],
            },
          },
          totalBlogs: { $sum: 1 },
        },
      },
      { $sort: { totalReach: -1 } },
    ]);

    // Find the index of the requested user to determine rank
    const userIndex = rankedUsers.findIndex(
      (u) => u._id.toString() === userId.toString()
    );

    const userRank = userIndex === -1 ? rankedUsers.length + 1 : userIndex + 1;
    const userReach = userIndex === -1 ? 0 : rankedUsers[userIndex].totalReach;

    // Fetch user details
    const userDetails = await User.findById(userId).select(
      "username avatarUrl countryCode email"
    );

    res.status(200).json({
      userDetails,
      totalReach: userReach,
      Rank: userRank,
    });
  } catch (err) {
    console.error("Error getting user rank:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, newPassword, countryCode } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (countryCode) user.countryCode = countryCode;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    if (req.file) {
      if (
        user.avatarUrl &&
        fs.existsSync(path.join("images", user.avatarUrl))
      ) {
        fs.unlinkSync(path.join("images", user.avatarUrl));
      }

      user.avatarUrl = req.file.filename;
    }
    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        countryCode: user.countryCode,
        avatarUrl: user.avatarUrl ? user.avatarUrl : null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove avatar from server if it exists
    if (user.avatarUrl) {
      const filePath = path.join(process.cwd(), "images", user.avatarUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await User.findByIdAndDelete(userId);

    res.clearCookie("token");

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  updateProfileUser,
  updateProfile,
  deleteAccount,
  getUserRank,
};
