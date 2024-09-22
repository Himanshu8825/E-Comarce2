import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const backendURL = `${import.meta.env.VITE_API_URL}/auth`;

export const signupUser = createAsyncThunk('/auth/signup', async (formData) => {
  try {
    const res = await axios.post(`${backendURL}/signup`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;

    return errorMessage;
  }
});

export const signinUser = createAsyncThunk('/auth/signin', async (formData) => {
  try {
    const res = await axios.post(`${backendURL}/signin`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    return errorMessage;
  }
});

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
  try {
    const res = await axios.post(
      `${backendURL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    return errorMessage;
  }
});

export const checkAuth = createAsyncThunk(
  '/auth/checkauth',

  async () => {
    const response = await axios.get(`${backendURL}/check-auth`, {
      withCredentials: true,
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });

    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
