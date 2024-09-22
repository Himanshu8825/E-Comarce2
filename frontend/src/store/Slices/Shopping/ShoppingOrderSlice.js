import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

const backendURL = `${import.meta.VITE_API_URL}/shop/order`;

export const createNewOrder = createAsyncThunk(
  '/order/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/create`, orderData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const capturePayment = createAsyncThunk(
  '/order/capturePayment',
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/capture`, {
        paymentId,
        payerId,
        orderId,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  '/order/getAllOrdersByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/list/${userId}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  '/order/getAllOrderDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/details/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: 'shoppingOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          'currentOrderId',
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});


export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
