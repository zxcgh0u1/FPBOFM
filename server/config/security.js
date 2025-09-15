
export const security = {
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  COOKIE_NAME: 'token',
  COOKIE_OPTS: { httpOnly: true, sameSite: 'lax', secure: false, path: '/' }
};
