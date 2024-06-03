import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dataLoad } from '../../utils/api';

const initialState = {
  data: [],
  isLoading: false,
  isFailed: false
};

const loadIngredientsSlice = createSlice({
  name: 'loadIngredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isFailed = false;
      })
      .addCase(fetchIngredients.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.data = [];
        state.isLoading = false;
        state.isFailed = true;
      });
  }
});

export const fetchIngredients = createAsyncThunk('loadIngredients/fetchIngredients', async (_, thunkAPI) => {
  try {
    return await dataLoad();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.massage);
  }
});

export default loadIngredientsSlice;
