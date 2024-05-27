import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../../utils/conts';

export const getCards = createAsyncThunk('products/getCards', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BaseURL}/price`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const getCoursInfoDate = createAsyncThunk('products/getCoursInfoDate', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BaseURL}/info`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    cards: [],
    coursInfoDate: [],
    isLoading: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, {payload}) => {
      state.cards = payload;
    });
    builder.addCase(getCoursInfoDate.fulfilled, (state, {payload}) => {
      state.coursInfoDate = payload;
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
