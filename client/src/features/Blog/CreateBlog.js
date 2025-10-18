import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { MdOutlinePostAdd } from "react-icons/md";
import {
  TbSquareRoundedChevronDownFilled,
  TbSquareRoundedChevronUpFilled,
} from "react-icons/tb";
import { useFormik } from "formik";
import { categories } from "./CreateBlogFormik";

function CreateBlog({ initialvalues, validationSchema, onSubmit, isLoading }) {
  const [loadingAI, setLoadingAI] = useState(false);
  const [toggle, seTtoggle] = useState(false);
  const [newTag, setNewTag] = useState("");

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Tags Array,", values);
      await onSubmit(values);
      resetForm();
      setNewTag("");
    },
  });

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (formik.values.tags.includes(trimmed)) return;

    formik.setFieldValue("tags", [...formik.values.tags, trimmed]);
    setNewTag("");
  };

  const handleRemoveTag = (tag) => {
    const filtered = formik.values.tags.filter((t) => t !== tag);
    formik.setFieldValue("tags", filtered);
  };

  const handleCorrectContent = async () => {
    if (!formik.values.content.trim()) return;
    setLoadingAI(true);
    try {
      const res = await fetch(
        "http://localhost:5000/blogit/apiV1/gemini/correct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: formik.values.content }),
        }
      );
      const data = await res.json();
      if (data.corrected) {
        formik.setFieldValue("content", data.corrected);
      }
    } catch (error) {
      console.error("Error calling backend:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`bg-baseColor w-full relative flex flex-col justify-between font-Cairo text-fontBaseColor border rounded-3xl border-fontBaseColor p-8 mb-4 overflow-hidden transition-all duration-300 ${
        toggle ? "max-h-[87vh]" : "max-h-36"
      }`}
    >
      <div
        className="absolute right-5 cursor-pointer"
        onClick={() => seTtoggle(!toggle)}
      >
        {toggle ? (
          <TbSquareRoundedChevronDownFilled className="text-[40px]" />
        ) : (
          <TbSquareRoundedChevronUpFilled className="text-[40px]" />
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <select
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mb-2 block bg-transparent border rounded-full pl-8 py-2 w-[50%] ${
            formik.touched.category && formik.errors.category
              ? "border-red-500"
              : "border-fontBaseColor"
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-sm">{formik.errors.category}</p>
        )}
      </div>

      {/* TITLE */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Blog title..."
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-2 w-full bg-transparent font-bold text-2xl focus:outline-none placeholder:text-fontBaseColor ${
            formik.touched.title && formik.errors.title
              ? "border-b-2 border-red-500"
              : ""
          }`}
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}
      </div>

      {/* CONTENT */}
      <div>
        <textarea
          name="content"
          placeholder="Write your blog content..."
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-2 w-full h-80 bg-transparent focus:outline-none placeholder:text-fontBaseColor ${
            formik.touched.content && formik.errors.content
              ? "border border-red-500"
              : ""
          }`}
        ></textarea>
        {formik.touched.content && formik.errors.content && (
          <p className="text-red-500 text-sm">{formik.errors.content}</p>
        )}
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap items-center gap-2">
        {formik.values.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-fontBaseColor text-baseColor px-4 py-2 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-baseColor hover:text-red-400"
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add tag..."
          className="border border-fontBaseColor rounded-full px-4 py-2 w-32 bg-fontBaseColor text-baseColor placeholder:text-baseColor"
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="rounded-full border w-10 h-10 border-fontBaseColor hover:bg-secondaryColor transition-colors"
        >
          +
        </button>
      </div>
      {formik.touched.tags && formik.errors.tags && (
        <p className="text-red-500 text-sm">{formik.errors.tags}</p>
      )}

      <div className="flex justify-end space-x-12">
        <div className="relative flex items-center gap-2">
          <label
            htmlFor="image"
            className="flex items-center gap-1 cursor-pointer"
          >
            <CiImageOn fontSize="20" />
            <span>Picture</span>
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
          />
        </div>
        <button
          type="button"
          onClick={handleCorrectContent}
          disabled={loadingAI}
          className="flex items-center gap-2"
        >
          <GoPencil fontSize="20" />
          {loadingAI ? "Correcting..." : "Correct"}
        </button>
        <button
          type="submit"
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <MdOutlinePostAdd fontSize="20" /> {isLoading ? "loading" : "Blogit"}
        </button>
      </div>
    </form>
  );
}

export default CreateBlog;
