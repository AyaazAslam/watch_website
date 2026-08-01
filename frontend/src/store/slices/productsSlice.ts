import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CatalogProduct } from '../../types';
import * as productService from '../../services/productService';
import type { ProductFormPayload } from '../../services/productService';
import { ApiError } from '../../lib/api';

export type { ProductFormPayload as ProductInput };

interface ProductsState {
  items: CatalogProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: Record<string, string> | undefined, { rejectWithValue }) => {
    try {
      const data = await productService.fetchProducts(params);
      return data.products;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to load products';
      return rejectWithValue(message);
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (payload: ProductFormPayload, { rejectWithValue }) => {
    try {
      const data = await productService.createProduct(payload);
      return data.product;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to create product';
      return rejectWithValue(message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (payload: ProductFormPayload, { rejectWithValue }) => {
    try {
      if (!payload.id) {
        return rejectWithValue('Product id is required');
      }
      const data = await productService.updateProduct(payload.id, payload);
      return data.product;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to update product';
      return rejectWithValue(message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to delete product';
      return rejectWithValue(message);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load products';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.items;
export const selectProductsStatus = (state: { products: ProductsState }) =>
  state.products.status;

export default productsSlice.reducer;
