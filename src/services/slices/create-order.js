import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../utils/api';

const initialState = {
  orderNumber: null,
  isLoading: false,
  isError: false
};

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.isLoading = false;
      state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchOrder.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderNumber = null;
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { clearOrder } = createOrderSlice.actions;

export const fetchOrder = createAsyncThunk('createOrder/fetchOrder', async (ingredients, thunkAPI) => {
  try {
    return await api.createOrder(ingredients);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export default createOrderSlice;
