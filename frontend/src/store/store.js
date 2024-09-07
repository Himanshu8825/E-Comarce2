import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './Slices/Admin/ProductSlice';
import authSlice from './Slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductSlice,
  },
});

export default store;
