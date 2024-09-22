import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

const backendURL = `${import.meta.VITE_API_URL}/shop/products`;

// Thunk in Slice Code
export const fetchAllFilteredProducts = createAsyncThunk(
  '/products/fetchAllFilteredProducts',
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const result = await axios.get(`${backendURL}/get?${query}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch products' }
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  '/products/fetchProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${backendURL}/get/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch products' }
      );
    }
  }
);

const shoppingProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.productList = action.payload.data || [];
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;

        state.productDetails = action.payload.data || [];
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productList = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
