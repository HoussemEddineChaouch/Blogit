import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/blogit/apiv1/blogs/";
const API_URL_TOW = "http://localhost:5000/blogit/apiv1/comments/";
axios.defaults.withCredentials = true;

export const getBlogs = createAsyncThunk(
  "blogs/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}list`);
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

export const commentBlog = createAsyncThunk(
  "blogs/blog-comment",
  async ({ blogId, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL_TOW}/add/${blogId}`, {
        comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getComments = createAsyncThunk(
  "blogs/get-comments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL_TOW}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const toggleLike = createAsyncThunk(
  "blogs/like",
  async ({ blogId, typeLike }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}like/${blogId}`, {
        typeLike,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const topBloggers = createAsyncThunk(
  "blogs/top-blogers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}top-bloggers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const topBlogs = createAsyncThunk(
  "blogs/top-blogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}top-blogs`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const blogIt = createAsyncThunk(
  "blogs/create-blog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}blogit`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}delete/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getBlog = createAsyncThunk(
  "blogs/single-blog",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}blog/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}update/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while updating the blog"
      );
    }
  }
);

export const getBlogsByCategory = createAsyncThunk(
  "blogs/getByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/category`, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);
