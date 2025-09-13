import { http } from './http.js';

// Получить профиль текущего пользователя
export async function getProfile() {
  return await http.get('/auth/profile');
}

// Войти
export async function login(credentials) {
  const data = await http.post('/auth/login', credentials);

  if (data.token) {
    localStorage.setItem('token', data.token);
  }

  return data;
}

// Зарегистрироваться
export async function register(userData) {
  const data = await http.post('/auth/register', userData);

  if (data.token) {
    localStorage.setItem('token', data.token);
  }

  return data;
}

// Выйти
export function logout() {
  localStorage.removeItem('token');
}
