import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AdminOrder } from '../../types';
import * as orderService from '../../services/orderService';
import { ApiError } from '../../lib/api';

interface OrdersState {
  items: AdminOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await orderService.fetchOrders();
      return data.orders;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to load orders';
      return rejectWithValue(message);
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async (
    payload: { id: string; status: AdminOrder['status'] },
    { rejectWithValue },
  ) => {
    try {
      const data = await orderService.updateOrderStatus(
        payload.id,
        payload.status,
      );
      return data.order;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to update status';
      return rejectWithValue(message);
    }
  },
);

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(id);
      return id;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to delete order';
      return rejectWithValue(message);
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload);
      });
  },
});

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.items;
export const selectOrdersStatus = (state: { orders: OrdersState }) =>
  state.orders.status;

export default ordersSlice.reducer;
