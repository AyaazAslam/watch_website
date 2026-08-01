import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AdminUser } from '../../types';
import * as authService from '../../services/authService';
import { clearToken, getToken } from '../../lib/api';
import { ApiError } from '../../lib/api';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: getToken(),
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await authService.login(credentials.email, credentials.password);
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Login failed';
      return rejectWithValue(message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; phone?: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await authService.register(payload);
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Signup failed';
      return rejectWithValue(message);
    }
  },
);

export const loadMe = createAsyncThunk(
  'auth/loadMe',
  async (_, { rejectWithValue }) => {
    try {
      if (!getToken()) return rejectWithValue('No token');
      const data = await authService.getMe();
      return data.user;
    } catch (error) {
      clearToken();
      const message =
        error instanceof ApiError ? error.message : 'Session expired';
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      authService.logout();
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        // Account created — user must log in next (no auto session)
        state.status = 'idle';
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Signup failed';
      })
      .addCase(loadMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = getToken();
      })
      .addCase(loadMe.rejected, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.token && state.auth.user);

export default authSlice.reducer;
