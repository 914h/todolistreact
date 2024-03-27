// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Configure tree shaking to remove unused Font Awesome icons
    rollupOptions: {
      treeshake: true,
    },
  },
});
