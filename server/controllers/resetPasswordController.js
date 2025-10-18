const { User, validationResetPassword } = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  Otp,
  generateAndHashOtp,
  validationEmailOtp,
} = require("../models/Otp");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { config } = require("../config/config");

/**----------------------------- 
 @desc        sent otp code with 4-digitto complet process of reset password
 @router      /blogit/apiv1/forget-password/sendOtp
 @method      POST
 @access      public
------------------------------*/

async function SendOtp(req, res) {
  try {
    const { error } = validationEmailOtp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User with given email doesn't exist !" });
    }

    const [otp, hashedOTP] = await generateAndHashOtp();

    await Otp.create({
      email: req.body.email,
      otp: hashedOTP,
      userId: user._id,
    });

    await sendEmail(
      user.email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
     <p>Here is your OTP code: ${otp}</p>`
    );

    res.cookie("userEmail", req.body.email, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 10,
    });

    res.status(200).json({
      message: `OTP code sent successfully to ${req.body.email}`,
    });
  } catch (error) {
    console.log(error);
  }
}

/**----------------------------- 
 @desc        verifiy Otp tp complete process of reset password
 @router      /Blogit/apiv1/forget-password/verifyOtp
 @method      POST
 @access      public
------------------------------*/

async function verifyOtp(req, res) {
  try {
    if (req.body.plainOtp.length != 4) {
      return res.status(401).json({
        message: "OTP Invalid !.",
      });
    }

    const holdedOtp = await Otp.findOne({ email: req.userEmail });

    if (!holdedOtp) {
      return res.status(401).json({
        message: "OTP verification failed: OTP not found or has expired.",
      });
    }
    const isValidOTP = await bcrypt.compare(req.body.plainOtp, holdedOtp.otp);

    if (!isValidOTP) {
      return res.status(401).json({
        message:
          "OTP verification failed: OTP is incorrect or has expired. Please request a new OTP.",
      });
    }

    const user = await User.findOne(holdedOtp.userId);

    const tokenReset = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.secretKey,
      {
        expiresIn: "10m",
      }
    );

    res.clearCookie("userEmail", {
      httpOnly: true,
      sameSite: "strict",
    });

    const tokenLink = tokenReset;

    res.status(200).json({ message: "OTP verified successfully !", tokenLink });
  } catch (error) {
    console.log(error);
  }
}

/**----------------------------- 
 @desc        Reset Password
 @router      /blogit/apiv1/forget-password/reset-password
 @method      POST
 @access      public
------------------------------*/

async function resetPassword(req, res) {
  try {
    const { error } = validationResetPassword(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const hashedNewPassword = await bcrypt.hash(req.body.confirmPassword, 10);

    await User.findByIdAndUpdate(req.resetToken.id, {
      $set: { password: hashedNewPassword },
    });

    res.status(200).json({
      message:
        "Congratulations! Your password has been successfully changed. !",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { SendOtp, verifyOtp, resetPassword };
