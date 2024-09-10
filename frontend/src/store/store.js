import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './Slices/Admin/ProductSlice';
import authSlice from './Slices/authSlice';
import ShoppingProductSlice from './Slices/Shopping/ShoppingProductSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductSlice,
    shoppingProducts: ShoppingProductSlice,
  },
});

export default store;
