import { createSlice } from "@reduxjs/toolkit";
import { deleteAccount, me, updateProfile } from "./userThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoading: false,
    isAuthentificated: false,
    successMsg: null,
    errorMsg: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMsg = null;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.pending, (state) => {
        state.isLoading = true;
        state.isAuthentificated = false;
      })
      .addCase(me.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthentificated = true;
        state.user = payload;
      })
      .addCase(me.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(deleteAccount.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMsg = payload.message;
      })
      .addCase(deleteAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.userDetails = payload.user;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { clearMessages } = userSlice.actions;
export default userSlice.reducer;
