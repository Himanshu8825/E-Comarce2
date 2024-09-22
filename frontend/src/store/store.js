import { configureStore } from '@reduxjs/toolkit';
import featureImageSlice from '../store/Slices/Common/CommonSlice';
import AdminOrderSlice from './Slices/Admin/AdminOrderSlice';
import AdminProductSlice from './Slices/Admin/ProductSlice';
import authSlice from './Slices/authSlice';
import shopAddressSlice from './Slices/Shopping/AddressSlice';
import shoppingCartSlice from './Slices/Shopping/CartSlice';
import ReviewSlice from './Slices/Shopping/ReviewSlice';
import SearchSlice from './Slices/Shopping/SearchSlice';
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
    shopSearch: SearchSlice,
    productReview: ReviewSlice,
    commonFeature: featureImageSlice,
  },
});

export default store;
