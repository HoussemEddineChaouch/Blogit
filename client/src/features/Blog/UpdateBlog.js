import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import defaultImage from "../../assets/images/blog.jpg";

function UpdateBlog({ initialValues, validationSchema, onCancel, onSubmit }) {
  const [imagePreview, setImagePreview] = useState(
    initialValues.image
      ? `http://localhost:5000/images/${initialValues.image}`
      : defaultImage
  );
  const [newTag, setNewTag] = useState("");

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("category", values.category);
      formData.append("metaTags", JSON.stringify(values.tags));
      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      }
      onSubmit(formData);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !formik.values.tags.includes(tag)) {
      formik.setFieldValue("tags", [...formik.values.tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
      className="relative font-Cairo text-fontBaseColor border rounded-3xl border-fontBaseColor p-6 mb-4 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-lg">Update Blog</h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Image */}
        <div>
          <img
            src={imagePreview}
            alt="blog preview"
            className="w-full h-[250px] object-cover rounded-lg mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded-lg w-full text-sm"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your blog title..."
            className={`w-full border rounded-xl p-2 mt-2 focus:outline-none ${
              formik.errors.title && formik.touched.title
                ? "border-redColor"
                : "border-fontBaseColor"
            }`}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-redColor text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="font-medium">Content</label>
          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="6"
            placeholder="Write your blog content here..."
            className={`bg-transparent w-full border rounded-xl p-3 mt-2 focus:outline-none resize-none ${
              formik.errors.content && formik.touched.content
                ? "border-redColor"
                : "border-fontBaseColor"
            }`}
          />
          {formik.errors.content && formik.touched.content && (
            <p className="text-redColor text-sm mt-1">
              {formik.errors.content}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium">Tags</label>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              className="border border-fontBaseColor rounded-full py-2 px-4 w-full focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-fontBaseColor text-baseColor px-4 py-2 rounded-full"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {formik.values.tags.length > 0 ? (
              formik.values.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-fontBaseColor text-baseColor px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-redColor text-xs font-bold ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No tags added yet</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="btn bg-redColor px-6 py-2 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-greenColor px-6 py-2 rounded-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default UpdateBlog;
