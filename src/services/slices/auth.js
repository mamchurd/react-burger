import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../utils/api';

const initialState = {
  user: null,
  isAuth: false,
  isFetch: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsFetch: (state, action) => {
      state.isFetch = action.payload;
    }
  },
  selectors: {
    getIsAuth: (state) => state.isAuth,
    getUser: (state) => state.user,
    getIsFetch: (state) => state.isFetch
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isFetch = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isFetch = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isFetch = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isFetch = false;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.isFetch = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isFetch = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isFetch = false;
      state.isAuth = true;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isFetch = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isIncorrect = true;
      state.isFetch = false;
    });
  }
});

export const login = createAsyncThunk('auth/login', async (form, thunkAPI) => {
  try {
    return await api.login(form);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await api.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (form, thunkAPI) => {
  try {
    return await api.register(form);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { dispatch }) => {
  if (localStorage.getItem('accessToken')) {
    api
      .getUser()
      .then((res) => dispatch(setUser(res.user)))
      .finally(() => dispatch(setIsAuth(true)));
  } else {
    dispatch(setIsAuth(true));
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (form, { dispatch }) => {
  if (localStorage.getItem('accessToken')) {
    dispatch(setIsFetch(true));
    api
      .updateUser(form)
      .then((res) => dispatch(setUser(res.user)))
      .finally(() => dispatch(setIsFetch(false)));
  }
});

export default authSlice;

export const { getIsAuth, getUser, getIsFetch, getErrorMessage } = authSlice.selectors;
export const { setUser, setIsAuth, setIsFetch } = authSlice.actions;
