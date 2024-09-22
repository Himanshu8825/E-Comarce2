import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  addressList: [],
};

const backendURL = `${import.meta.env.VITE_API_URL}/shop/address`;

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
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendURL}/update/${userId}/${addressId}`,
        formData
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

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
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
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedAddress = action.payload.data;

        // Find the index of the updated address in the addressList
        const index = state.addressList.findIndex(
          (address) => address._id === updatedAddress._id
        );

        if (index !== -1) {
          state.addressList[index] = updatedAddress; // Update the address
        }
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
