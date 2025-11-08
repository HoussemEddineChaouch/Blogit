import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/blogit/apiv1/auth/";
const API_URL_TWO = "http://localhost:5000/blogit/apiv1/users/";
axios.defaults.withCredentials = true;

export const signUpUser = createAsyncThunk(
  "auth/sign-up",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}signup`, data);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/sign-in",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}signin`, data);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL_TWO}profile`);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const sendOpt = createAsyncThunk(
  "otp/send-otp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}otp/send-otp`, data);
      return response.data.message;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "otp/verify-otp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}otp/verify-otp`, data);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "otp/reset-password",
  async ({ token, ...data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}otp/reset-password?token=${token}`,
        data
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred. Please try again.";

      return rejectWithValue(message);
    }
  }
);
export const verifyMe = createAsyncThunk(
  "auth/verify-me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/blogit/apiv1/auth/verify-me"
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred. Please try again.";

      return rejectWithValue(message);
    }
  }
);
