import { apiRequest } from '../lib/api';
import type { AdminUser, UserRole, UserStatus } from '../types';

export type CreateUserInput = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: UserRole;
  status?: UserStatus;
  orders?: number;
};

export type UpdateUserInput = Partial<Omit<AdminUser, 'id' | 'joinedAt'>> & {
  password?: string;
};

type UsersResponse = { count: number; users: AdminUser[] };
type UserResponse = { user: AdminUser };

export function fetchUsers(params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params)}` : '';
  return apiRequest<UsersResponse>(`/users${query}`, { auth: true });
}

export function createUser(payload: CreateUserInput) {
  return apiRequest<UserResponse>('/users', {
    method: 'POST',
    body: payload,
    auth: true,
  });
}

export function updateUser(id: string, payload: UpdateUserInput) {
  return apiRequest<UserResponse>(`/users/${id}`, {
    method: 'PUT',
    body: payload,
    auth: true,
  });
}

export function updateUserRole(id: string, role: UserRole) {
  return apiRequest<UserResponse>(`/users/${id}/role`, {
    method: 'PATCH',
    body: { role },
    auth: true,
  });
}

export function updateUserStatus(id: string, status: UserStatus) {
  return apiRequest<UserResponse>(`/users/${id}/status`, {
    method: 'PATCH',
    body: { status },
    auth: true,
  });
}

export function deleteUser(id: string) {
  return apiRequest<{ message: string; id: string }>(`/users/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}
