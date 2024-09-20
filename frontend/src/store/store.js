import { configureStore } from '@reduxjs/toolkit';
import AdminOrderSlice from './Slices/Admin/AdminOrderSlice';
import AdminProductSlice from './Slices/Admin/ProductSlice';
import authSlice from './Slices/authSlice';
import shopAddressSlice from './Slices/Shopping/AddressSlice';
import shoppingCartSlice from './Slices/Shopping/CartSlice';
import ShoppingOrderSlice from './Slices/Shopping/ShoppingOrderSlice';
import ShoppingProductSlice from './Slices/Shopping/ShoppingProductSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductSlice,
    adminOrder: AdminOrderSlice,
    shoppingProducts: ShoppingProductSlice,
    shoppingCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: ShoppingOrderSlice,
  },
});

export default store;
