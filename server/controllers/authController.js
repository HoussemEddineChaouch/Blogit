const bcrypt = require("bcryptjs");
const { User, validationSignUp, validationSignIn } = require("../models/User");
const jwt = require("jsonwebtoken");

/**----------------------------- 
 @desc        Sign up a new user
 @router      /blogit/apiv1/auth/signup
 @method      POST
 @access      public
------------------------------*/

async function signUpNewUser(req, res) {
  try {
    const { error } = validationSignUp(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Choose other email !" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "You Register successfully ! Sign in and Blogit some magic now.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
}

/**----------------------------- 
 @desc        Sign in user
 @router      /blogit/apiv1/auth/signin
 @method      POST
 @access      public
------------------------------*/

async function signIn(req, res) {
  try {
    const { error } = validationSignIn(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Email Inccorect !" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password Inccorect !" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.log(error);
  }
}

/**----------------------------- 
 @desc        verify the the user token in the cookies
 @router      /blogit/apiv1/auth/verify-me
 @method      GET
 @access      public
------------------------------*/

const verifyAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ message: "You are authenticated!", user: req.user });
};

/**----------------------------- 
 @desc        registre new user with google info
 @router      /blogit/apiv1/auth/google
 @method      POST
 @access      public
------------------------------*/

const googleCallback = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRETKEY,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect("http://localhost:3000");
};

/**----------------------------- 
 @desc        user logout and clear token in the cookies
 @router      /blogit/apiv1/auth/logout
 @method      POST
 @access      public
------------------------------*/

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { signUpNewUser, signIn, verifyAuth, googleCallback, logout };
