export const store = {
user: null,
async ensureAuth() {
const token = localStorage.getItem('token');
if (!token) return null;
try { this.user = await (await import('../api/auth.api.js')).apiAuth.me(); } catch { localStorage.removeItem('token'); this.user = null; }
return this.user;
}
};