import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth';
import productsSlice from './products/products';
import  coursSlice  from './cours/cours';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cours: coursSlice,
  },
});
