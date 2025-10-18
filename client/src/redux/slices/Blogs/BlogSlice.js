import { createSlice } from "@reduxjs/toolkit";
import {
  blogIt,
  commentBlog,
  getBlog,
  getBlogs,
  getBlogsByCategory,
  getComments,
  toggleLike,
  topBloggers,
  topBlogs,
  updateBlog,
} from "./BlogThunks";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blog: {},
    blogs: [],
    leaderboard: {},
    comments: [],
    isLoading: false,
    isLoadingComment: false,
    blogitLoading: false,
    isLoadingLike: false,
    errorMsg: null,
    successMsg: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMsg = null;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(getBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.blogs = payload;
      })
      .addCase(getBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.blogs = payload;
      })
      .addCase(commentBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload.message;
      })
      .addCase(commentBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.isLoadingComment = false;
        state.comments = payload.comments;
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.isLoadingComment = false;
        state.errorMsg = payload;
      })
      .addCase(toggleLike.pending, (state) => {
        state.isLoadingLike = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.isLoadingLike = false;
        state.isLoading = false;
        const updatedBlog = action.payload;

        state.blogs = state.blogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        );
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.isLoadingLike = false;
        state.errorMsg = action.payload || "Failed to toggle like.";
      })
      .addCase(topBloggers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(topBloggers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.leaderboard = payload;
      })
      .addCase(topBloggers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(topBlogs.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(topBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.leaderboard = payload;
      })
      .addCase(topBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(blogIt.pending, (state) => {
        state.blogitLoading = true;
      })
      .addCase(blogIt.fulfilled, (state, { payload }) => {
        state.blogitLoading = false;
        state.successMsg = payload.message;
      })
      .addCase(blogIt.rejected, (state, { payload }) => {
        state.blogitLoading = false;
        state.errorMsg = payload;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.blog = payload;
      })
      .addCase(getBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.blog = payload.blog;

        state.successMsg = payload.message;
      })
      .addCase(updateBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(getBlogsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsByCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.blogs = payload;
      })
      .addCase(getBlogsByCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { clearMessages } = blogSlice.actions;
export default blogSlice.reducer;
