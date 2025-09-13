const API = '/api';


function getToken() { return localStorage.getItem('token'); }
export function setToken(t) { localStorage.setItem('token', t); }
export function clearToken() { localStorage.removeItem('token'); }


export async function http(path, { method = 'GET', body, auth = true } = {}) {
const headers = { 'Content-Type': 'application/json' };
if (auth && getToken()) headers['Authorization'] = 'Bearer ' + getToken();
const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'API error');
return res.json();
}