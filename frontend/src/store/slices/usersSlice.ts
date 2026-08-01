import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AdminUser, UserRole, UserStatus } from '../../types';
import * as userService from '../../services/userService';
import type { CreateUserInput, UpdateUserInput } from '../../services/userService';
import { ApiError } from '../../lib/api';

interface UsersState {
  items: AdminUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.fetchUsers();
      return data.users;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to load users';
      return rejectWithValue(message);
    }
  },
);

export const addUser = createAsyncThunk(
  'users/add',
  async (payload: CreateUserInput, { rejectWithValue }) => {
    try {
      const data = await userService.createUser(payload);
      return data.user;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to create user';
      return rejectWithValue(message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (
    payload: { id: string; data: UpdateUserInput },
    { rejectWithValue },
  ) => {
    try {
      const data = await userService.updateUser(payload.id, payload.data);
      return data.user;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to update user';
      return rejectWithValue(message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to delete user';
      return rejectWithValue(message);
    }
  },
);

export const setUserRole = createAsyncThunk(
  'users/setRole',
  async (
    payload: { id: string; role: UserRole },
    { rejectWithValue },
  ) => {
    try {
      const data = await userService.updateUserRole(payload.id, payload.role);
      return data.user;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to update role';
      return rejectWithValue(message);
    }
  },
);

export const setUserStatus = createAsyncThunk(
  'users/setStatus',
  async (
    payload: { id: string; status: UserStatus },
    { rejectWithValue },
  ) => {
    try {
      const data = await userService.updateUserStatus(
        payload.id,
        payload.status,
      );
      return data.user;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to update status';
      return rejectWithValue(message);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      })
      .addCase(setUserRole.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(setUserStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export const selectUsers = (state: { users: UsersState }) => state.users.items;
export const selectUsersStatus = (state: { users: UsersState }) =>
  state.users.status;

export default usersSlice.reducer;
