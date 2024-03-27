import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Correct import statement for the plugin

// Define your Vite configuration
export default defineConfig({
  plugins: [react()], // Use react() instead of reactPlugin()
  build: {
    rollupOptions: {
      external: ['react-toastify'],
    },
  },
});
