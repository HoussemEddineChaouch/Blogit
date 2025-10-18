import React, { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import defaultImage from "../../assets/images/blog.jpg";
import Comment from "../../components/shared/Comment";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSolidCommentDots } from "react-icons/bi";

function Blogpost({
  onUpdateBlog,
  onDeleteBlog,
  handleLike,
  commentList,
  isLoading,
  seeComments,
  handleComment,
  inHome = false,
  image = defaultImage,
  title = "Untitled Blog",
  content = "To pass an icon as a prop in React, you can treat the icon component itself as a prop. This allows for dynamic and reusable components where the displayed icon can be easily changed. To pass an icon as a prop in React, you can treat the icon component itself as a prop. This allows for dynamic and reusable components where the displayed icon can be easily changed.To pass an icon as a prop in React, you can treat the icon component itself as a prop. This allows for dynamic and reusable components where the displayed icon can be easily changed.",
  reach = [124, 113, 213],
  blogId,
}) {
  const [isOpen, setOpen] = useState(false);
  const toggleComment = () => {
    setOpen((prev) => !prev);
  };

  const [comment, setComment] = useState("");
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmitComment = () => {
    if (!comment.trim()) return;
    handleComment({ blogId, comment });
    setComment("");
  };

  const deleteBlog = () => {
    onDeleteBlog(blogId);
  };

  const navigateUpdate = () => {
    onUpdateBlog();
  };

  return (
    <>
      <div className="relative font-Cairo text-fontBaseColor border rounded-3xl border-fontBaseColor p-4 mb-4">
        <img
          src={`http://localhost:5000/images/${image}`}
          alt="blog-image"
          className="w-full h-[300px] object-cover rounded-lg"
        />
        <div className="space-y-4 mt-4">
          <div>
            <h1 className="font-bold mb-2">{title}</h1>
            <p>{content}</p>
          </div>

          <div className=" flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <FaFireAlt onClick={() => handleLike(blogId, "firesCount")} />{" "}
                {reach[0].length}
              </span>
              <span className="flex items-center gap-2">
                <BsRocketTakeoff
                  onClick={() => handleLike(blogId, "rocketCount")}
                />

                {reach[1].length}
              </span>
              <span className="flex items-center gap-2">
                <FaRegStarHalfStroke
                  onClick={() => handleLike(blogId, "starCount")}
                />
                {reach[2].length}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {inHome ? (
                <div className="flex items-center relative">
                  <input
                    onChange={handleChange}
                    value={comment}
                    type="text"
                    name="comment"
                    placeholder="Comment somthing..."
                    className=" focus:outline-none border absolute right-36 w-[300px] border-fontBaseColor border-r-0 py-2 pl-6 rounded-l-full"
                  />
                  <button
                    onClick={onSubmitComment}
                    className=" flex items-center gap-2 bg-fontBaseColor text-baseColor py-2 px-8 rounded-full"
                  >
                    Comment <BiSolidCommentDots />
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <button
                    className="btn bg-redColor"
                    onClick={() => deleteBlog(blogId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn bg-greenColor"
                    onClick={navigateUpdate}
                  >
                    Update
                  </button>
                </div>
              )}
              <button
                className="btn bg-fontBaseColor"
                onClick={() => {
                  setOpen((prev) => !prev);
                  if (!isOpen) seeComments(blogId);
                }}
              >
                See comments
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="comments"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 right-0 p-4 overflow-auto scrollbar-thin bg-secondaryColor h-full w-1/2 shadow-2xl rounded-xl"
            >
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-secondaryColor">
                <div>
                  <h1 className="font-medium">Comments</h1>
                  <h1 className="text-sm opacity-50">
                    Explore Your Thoughts, Blogging Made Personal
                  </h1>
                </div>
                <button onClick={toggleComment}>
                  <IoIosCloseCircleOutline style={{ fontSize: 30 }} />
                </button>
              </div>
              {isLoading ? (
                <p>Loading comments...</p>
              ) : commentList.length > 0 ? (
                commentList.map((c) => (
                  <Comment
                    key={c._id}
                    user={c.user}
                    text={c.text}
                    createdAt={c.createdAt}
                  />
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Blogpost;
