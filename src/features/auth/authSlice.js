import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import { register } from 'services/userService';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from 'utils/index';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...credentials });
      toast.success('Your account has been successfully created');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      toast.success('You are successfully logged in');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJwt();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (new Date().getTime() > expiredToken) {
    removeFromStorage();
    initialState.user = null;
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    setLogout: (state) => {
      removeFromStorage();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
        state.user = null;
      });
  },
});

export const { reset, setLogout } = authSlice.actions;

export default authSlice.reducer;
