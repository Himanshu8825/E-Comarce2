import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  reviews: [],
};

const backendURL = `${import.meta.env.VITE_API_URL}/shop/review`;

export const addReview = createAsyncThunk(
  '/order/addReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/add`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  '/order/getReviews',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
