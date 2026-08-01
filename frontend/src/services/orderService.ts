import { apiRequest } from '../lib/api';
import type { AdminOrder } from '../types';

type OrdersResponse = { count: number; orders: AdminOrder[] };
type OrderResponse = { order: AdminOrder };

export function fetchOrders(params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params)}` : '';
  return apiRequest<OrdersResponse>(`/orders${query}`, { auth: true });
}

export function createOrder(payload: Omit<AdminOrder, 'id'>) {
  return apiRequest<OrderResponse>('/orders', {
    method: 'POST',
    body: payload,
    auth: true,
  });
}

export function updateOrderStatus(id: string, status: AdminOrder['status']) {
  return apiRequest<OrderResponse>(`/orders/${id}/status`, {
    method: 'PATCH',
    body: { status },
    auth: true,
  });
}

export function deleteOrder(id: string) {
  return apiRequest<{ message: string; id: string }>(`/orders/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}
