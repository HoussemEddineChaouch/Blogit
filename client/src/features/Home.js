import React, { useEffect } from "react";
import CategorySidebar from "../components/shared/CategorySidebar";
import CreateBlog from "./Blog/CreateBlog";
import Blogpost from "./Blog/Blogpost";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import {
  blogIt,
  commentBlog,
  getBlogs,
  getBlogsByCategory,
  getComments,
  toggleLike,
} from "../redux/slices/Blogs/BlogThunks";
import { showToast } from "../utils/toastHandler";
import { clearMessages } from "../redux/slices/Blogs/BlogSlice";
import {
  formInitialValues,
  formValidationSchema,
} from "./Blog/CreateBlogFormik";

function Home() {
  const dispatch = useDispatch();
  const {
    isLoading,
    blogs,
    successMsg,
    errorMsg,
    isLoadingComment,
    comments,
    blogitLoading,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const handleComment = async ({ blogId, comment }) => {
    if (!comment.trim()) return;
    dispatch(commentBlog({ blogId, comment }));
  };

  const handleSeeComments = (blogId) => {
    dispatch(getComments(blogId));
  };

  useEffect(() => {
    if (successMsg) {
      showToast("success", successMsg);
    } else if (errorMsg) {
      showToast("error", errorMsg);
    }
    dispatch(clearMessages());
  }, [successMsg, errorMsg, dispatch]);

  const handleLikeBlog = (blogId, typeLike) => {
    dispatch(toggleLike({ blogId, typeLike }));
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("blogImage", values.image);
    formData.append("metaTags", JSON.stringify(values.tags || []));
    dispatch(blogIt(formData));
  };

  const handleOnSubmt = (category) => {
    dispatch(getBlogsByCategory(category));
  };

  const resetAll = () => {
    dispatch(getBlogs());
  };
  return (
    <div className="font-Cairo  flex items-start gap-4">
      <div className="flex-1">
        <CreateBlog
          initialvalues={formInitialValues}
          validationSchema={formValidationSchema}
          onSubmit={handleSubmit}
          isLoading={blogitLoading}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          blogs.map(
            ({
              _id,
              title,
              content,
              image,
              firesCount,
              rocketCount,
              starCount,
            }) => (
              <Blogpost
                inHome={true}
                key={_id}
                blogId={_id}
                title={title}
                content={content}
                image={image}
                reach={[firesCount, rocketCount, starCount]}
                handleComment={handleComment}
                seeComments={() => handleSeeComments(_id)}
                handleLike={handleLikeBlog}
                isLoading={isLoadingComment}
                commentList={comments}
              />
            )
          )
        )}
      </div>
      <CategorySidebar onSubmit={handleOnSubmt} onReset={resetAll}/>
    </div>
  );
}

export default Home;
