const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otpGenerator = require("otp-generator");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

//--- otp model
const otpSchema = new Schema({
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

//------- Otp Model
const Otp = mongoose.model("OTP", otpSchema);

//---- validation OTP Email
function validationEmailOtp(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
  });
  return schema.validate(obj);
}

//---- generate and hash otp
async function generateAndHashOtp() {
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const salt = await bcrypt.genSalt(10);
  const hashedOTP = await bcrypt.hash(otp, salt);

  return [otp, hashedOTP];
}

module.exports = { Otp, generateAndHashOtp, validationEmailOtp };
