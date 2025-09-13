import { http, setToken } from './http.js';
export const apiAuth = {
async register(email, username, password) { const { token } = await http('/auth/register', { method: 'POST', body: { email, username, password }, auth: false }); setToken(token); },
async login(email, password) { const { token } = await http('/auth/login', { method: 'POST', body: { email, password }, auth: false }); setToken(token); },
me() { return http('/auth/me'); },
};