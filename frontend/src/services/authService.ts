import { apiRequest, setToken, clearToken } from '../lib/api';
import type { AdminUser } from '../types';

type AuthResponse = {
  token: string;
  user: AdminUser;
};

export async function login(email: string, password: string) {
  const data = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  setToken(data.token);
  return data;
}

/** Create account only — does not log the user in. */
export async function register(payload: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export async function getMe() {
  return apiRequest<{ user: AdminUser }>('/auth/me', { auth: true });
}

export function logout() {
  clearToken();
}
