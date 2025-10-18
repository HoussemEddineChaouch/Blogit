import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/blogit/apiv1/users/";
axios.defaults.withCredentials = true;

export const me = createAsyncThunk(
  "user/initial-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}rank`);
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

export const deleteAccount = createAsyncThunk(
  "user/delete-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}delete`);
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

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}update-profile`, data);
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
