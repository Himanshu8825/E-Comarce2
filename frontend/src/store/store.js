import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './Slices/Admin/ProductSlice';
import authSlice from './Slices/authSlice';
import shoppingCartSlice from './Slices/Shopping/CartSlice';
import ShoppingProductSlice from './Slices/Shopping/ShoppingProductSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductSlice,
    shoppingProducts: ShoppingProductSlice,
    shoppingCart: shoppingCartSlice,
  },
});

export default store;
