
const API_PREFIX = '/api';

async function request(path, options = {}){
  const res = await fetch(API_PREFIX + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers||{}) },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const ct = res.headers.get('content-type')||'';
  const data = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (data && (data.error||data.message)) || res.statusText;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const get = (p) => request(p);
export const post = (p, body) => request(p, { method: 'POST', body });
export const put = (p, body) => request(p, { method: 'PUT', body });
export const del = (p) => request(p, { method: 'DELETE' });
