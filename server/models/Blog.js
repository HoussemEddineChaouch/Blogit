const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    metaTags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
    },
    firesCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rocketCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    starCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "blogId",
  localField: "_id",
});

//----Blog Model
const Blog = mongoose.model("Blog", blogSchema);

blogSchema.virtual("TotalReach").get(function () {
  return (
    this.firesCount.length + this.rocketCount.length + this.starCount.length
  );
});

//----Validate Blog
function validationBlog(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    content: Joi.string().trim().min(100).max(3000).required(),
    category: Joi.string().required(),
    metaTags: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ),
  });
  return schema.validate(obj);
}

//----Validate update Blog
function validationUpdateBlog(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(100),
    content: Joi.string().trim().min(100).max(3000),
    category: Joi.string().required(),
  });
  return schema.validate(obj);
}

module.exports = { Blog, validationBlog, validationUpdateBlog };
