import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  isLoading: false,
};

const backendURL = 'http://localhost:3000/shop/cart';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${backendURL}/add`, {
        userId,
        productId,
        quantity,
      });

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to add to cart products' }
      );
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${backendURL}/get/${userId}`);

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch to cart products' }
      );
    }
  }
);

export const updateCartItems = createAsyncThunk(
  'cart/updateCartItems',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const result = await axios.put(`${backendURL}/update-cart`, {
        userId,
        productId,
        quantity,
      });

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to update to cart products' }
      );
    }
  }
);

export const deleteCartItems = createAsyncThunk(
  'cart/deleteCartItems',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${backendURL}/${userId}/${productId}`);

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to delete to cart products' }
      );
    }
  }
);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
