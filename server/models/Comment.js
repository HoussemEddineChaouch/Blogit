const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const commentSchema = new Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//----Comment Model
const Comment = mongoose.model("Comment", commentSchema);

//----Validate create comment
function validationCreateComment(obj) {
  const schema = Joi.object({
    comment: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

//----Validate update comment
function validationUpdateComment(obj) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

//----Validate delete comment
function validationDeleteComment(obj) {
  const schema = Joi.object({
    blogId: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  Comment,
  validationCreateComment,
  validationUpdateComment,
  validationDeleteComment,
};
