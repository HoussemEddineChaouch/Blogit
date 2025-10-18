import { createSlice } from "@reduxjs/toolkit";
import {
  getProfile,
  resetPassword,
  sendOpt,
  signInUser,
  signUpUser,
  verifyMe,
  verifyOtp,
} from "./AuthThunks";
import { deleteBlog, toggleLike } from "../Blogs/BlogThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: {},
    user: null,
    isAuth: false,
    otpLink: null,
    isLoadingAuth: false,
    errorMsg: null,
    successMsg: null,
    deleteLoading: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMsg = null;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload.message;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload || "Somthin is worng ";
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload.message;
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(sendOpt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOpt.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload;
      })
      .addCase(sendOpt.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload.message;
        state.otpLink = payload.tokenLink;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload.message;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.profile = payload;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.profile = payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        if (state.profile?.user?.blogs) {
          state.profile.user.blogs = state.profile.user.blogs.map((blog) =>
            blog._id === updatedBlog._id ? updatedBlog : blog
          );
        }
      })
      .addCase(deleteBlog.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.successMsg = payload.message;
        state.profile.user.blogs = state.profile.user.blogs.filter(
          (blog) => blog._id !== payload.blogId
        );
      })
      .addCase(deleteBlog.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.errorMsg = payload;
      })
      .addCase(verifyMe.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(verifyMe.fulfilled, (state, { payload }) => {
        state.isLoadingAuth = false;
        state.isAuth = true;
        state.user = payload.user;
      })
      .addCase(verifyMe.rejected, (state, { payload }) => {
        state.isLoadingAuth = false;
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;
