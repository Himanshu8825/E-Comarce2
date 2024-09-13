import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  addressList: [],
};

const backendURL = 'http://localhost:3000/shop/address';

export const addNewAddress = createAsyncThunk(
  '/addresses/newAddress',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/add`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  '/addresses/fetchAllAddresses',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editAddress = createAsyncThunk(
  '/addresses/editAddress',
  async ({ userId, addressId, formdata }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendURL}/update/${userId}/${addressId}`,
        formdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  '/addresses/deleteAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${backendURL}/delete/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default AddressSlice.reducer;
