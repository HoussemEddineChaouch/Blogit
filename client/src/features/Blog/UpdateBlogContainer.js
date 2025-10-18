import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import UpdateBlog from "../Blog/UpdateBlog";
import { getBlog, updateBlog } from "../../redux/slices/Blogs/BlogThunks";
import { clearMessages } from "../../redux/slices/Blogs/BlogSlice";
import Spinner from "../../components/shared/Spinner";
import { showToast } from "../../utils/toastHandler";

function UpdateBlogContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, isLoading, errorMsg, successMsg } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id, dispatch]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").min(5),
    content: Yup.string().required("Content is required").min(20),
  });

  const handleCancel = () => navigate(-1);

  const handleSubmit = (formData) => {
    dispatch(updateBlog({ id, formData }));
  };

  useEffect(() => {
    if (successMsg) {
      showToast("success", successMsg);
      dispatch(getBlog(id)); // refresh updated blog
    }
    if (errorMsg) showToast("error", errorMsg);

    dispatch(clearMessages());
  }, [successMsg, errorMsg, dispatch, id]);

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto mt-10">
      <UpdateBlog
        initialValues={{
          title: blog?.title || "",
          content: blog?.content || "",
          category: blog?.category || "",
          image: blog?.image || "",
          tags:
            Array.isArray(blog?.metaTags) && blog.metaTags.length > 0
              ? blog.metaTags.flatMap((t) => {
                  try {
                    const parsed = JSON.parse(t);
                    return Array.isArray(parsed) ? parsed : [t];
                  } catch {
                    return [t];
                  }
                })
              : [],
        }}
        validationSchema={validationSchema}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default UpdateBlogContainer;
