import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { tokenKey } from 'utils/index';
import * as authAPI from 'services/authService';
import { register } from 'services/userService';

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
const user = JSON.parse(localStorage.getItem(tokenKey));

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
    localStorage.clear();
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
      localStorage.clear();
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
        localStorage.setItem(tokenKey, JSON.stringify(payload));
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        localStorage.setItem(tokenKey, JSON.stringify(payload));
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      });
  },
});

export const { reset, setLogout } = authSlice.actions;

export default authSlice.reducer;