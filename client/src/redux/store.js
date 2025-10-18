import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AuthSlice from "./slices/Auth/AuthSlice";
import blogs from "./slices/Blogs/BlogSlice";
import userSlice from "./slices/User/userSlice";

const reducer = combineReducers({
  auth: AuthSlice,
  blog: blogs,
  user: userSlice,
});
const store = configureStore({ reducer });

export default store;
