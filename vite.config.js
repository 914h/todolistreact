import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default {
  plugins: [reactPlugin()],
  build: {
    rollupOptions: {
      external: ['react-toastify'],
    },
  },
};