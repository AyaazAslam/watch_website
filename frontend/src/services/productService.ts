import { apiRequest } from '../lib/api';
import type { CatalogProduct } from '../types';

export type ProductFormPayload = {
  id?: string;
  title: string;
  brand: string;
  gender?: CatalogProduct['gender'];
  price: number;
  comparePrice?: number;
  handle?: string;
  inStock?: boolean;
  badge?: string;
  badgeType?: CatalogProduct['badgeType'];
  imageFile?: File | null;
  image2File?: File | null;
  /** Keep existing URL when editing without a new file */
  image?: string;
  image2?: string;
};

export type ProductInput = ProductFormPayload;

type ProductsResponse = { count: number; products: CatalogProduct[] };
type ProductResponse = { product: CatalogProduct };

function toFormData(payload: ProductFormPayload) {
  const form = new FormData();

  form.append('title', payload.title);
  form.append('brand', payload.brand);
  form.append('price', String(payload.price));
  if (payload.gender) form.append('gender', payload.gender);

  if (payload.comparePrice !== undefined) {
    form.append('comparePrice', String(payload.comparePrice));
  }
  if (payload.handle) form.append('handle', payload.handle);
  if (payload.inStock !== undefined) {
    form.append('inStock', String(payload.inStock));
  }
  if (payload.badge) form.append('badge', payload.badge);
  if (payload.badgeType) form.append('badgeType', payload.badgeType);

  if (payload.imageFile) {
    form.append('image', payload.imageFile);
  } else if (payload.image) {
    form.append('image', payload.image);
  }

  if (payload.image2File) {
    form.append('image2', payload.image2File);
  } else if (payload.image2 !== undefined) {
    form.append('image2', payload.image2);
  }

  return form;
}

export function fetchProducts(params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params)}` : '';
  return apiRequest<ProductsResponse>(`/products${query}`);
}

export function fetchProductById(id: string) {
  return apiRequest<ProductResponse>(`/products/${id}`);
}

export function createProduct(payload: ProductFormPayload) {
  return apiRequest<ProductResponse>('/products', {
    method: 'POST',
    body: toFormData(payload),
    auth: true,
  });
}

export function updateProduct(id: string, payload: ProductFormPayload) {
  return apiRequest<ProductResponse>(`/products/${id}`, {
    method: 'PUT',
    body: toFormData(payload),
    auth: true,
  });
}

export function deleteProduct(id: string) {
  return apiRequest<{ message: string; id: string }>(`/products/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}
