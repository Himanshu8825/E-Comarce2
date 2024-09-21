import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

const backendURL = 'http://localhost:3000/admin/orders';

export const getAllOrdersForAdmin = createAsyncThunk(
  '/order/getAllOrdersForAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/get`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  '/order/getOrderDetailsForAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/details/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  '/order/updateOrderStatus',
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${backendURL}/update/${id}`, {
        orderStatus,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data.order; // Update to handle order
        state.userDetails = action.payload.data.user; // Add user details
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.userDetails = null; // Reset user details on error
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
