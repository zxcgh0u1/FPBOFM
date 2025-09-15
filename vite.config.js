import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // если фронт лежит в /public
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // ваш Node/Express порт
        changeOrigin: true,
      },
    },
  },
});
