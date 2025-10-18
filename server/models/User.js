const { userRole } = require("../utils/enums");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
// User Schema
const userSchema = new Schema(
  {
    googleId: { type: String, required: true },
    username: {
      type: String,
    },
    countryCode: {
      type: String,
      default: "Unknown",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatarUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    dateOfBirth: {
      type: Date,
    },
    userRole: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.USER,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    isAgreeTerms: {
      type: Boolean,
      default: true,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.secretKey, {
    expiresIn: "10d",
  });
};

// Populate Blogs tht belongs to this user when h/she get his/her profile
userSchema.virtual("blogs", {
  ref: "Blog",
  foreignField: "user",
  localField: "_id",
});

//-- virtyle to get full name

userSchema.virtual("fullName").get(function () {
  return `${this.firstName}${this.lastName}`;
});

// User Model
const User = mongoose.model("User", userSchema);

// Validation Sign Up
function validationSignUp(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(15).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(12).required(),
  });
  return schema.validate(obj);
}

// Validation Sign In
function validationSignIn(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(12).required(),
  });
  return schema.validate(obj);
}

// Validation Update Profile
function ValidationUpdateProfile(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(20).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(12),
    dateOfBirth: Joi.date(),
  });
  return schema.validate(obj);
}

// validation user password
function validationResetPassword(obj) {
  const schema = Joi.object({
    newPassword: Joi.string().min(8).max(12).required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("newPassword"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validationSignUp,
  validationSignIn,
  ValidationUpdateProfile,
  validationResetPassword,
};
