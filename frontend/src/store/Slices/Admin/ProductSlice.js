import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
};

const backendURL = 'http://localhost:3000/admin/products';

// Create thunk for adding a new product with error handling
export const addNewProduct = createAsyncThunk(
  'products/addnewproduct',
  async (FormData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${backendURL}/create-product`,
        FormData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to add product' }
      );
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${backendURL}/getAll-products`);


      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch products' }
      );
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${backendURL}/edit-product/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to edit product' }
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${backendURL}/delete-product/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to delete product' }
      );
    }
  }
);

// Create slice for managing product state
const AdminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;


        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
