import { http } from './http.js';

export async function login({ email, password }) {
  const data = await http.post('/auth/login', { email, password });
  if (data?.token) localStorage.setItem('token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}

export const me = () => http.get('/auth/me');
