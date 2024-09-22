import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  featureImageList: [],
};

const backendURL = `${import.meta.env.VITE_API_URL}/common/feature`;

// Create thunk for adding a new product with error handling
export const addFeatureImage = createAsyncThunk(
  'products/addFeatureImage',
  async (image, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${backendURL}/add`, { image });
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to add product' }
      );
    }
  }
);

export const getFeatureImages = createAsyncThunk(
  'products/getFeatureImages',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${backendURL}/get`);
      return result?.data; // Assuming result.data directly contains the feature images list
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch products' }
      );
    }
  }
);

const featureImageSlice = createSlice({
  name: 'featureImageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload; // Update based on the returned structure
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default featureImageSlice.reducer;
