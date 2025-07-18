import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        review: resolve(__dirname, './review.html'),
      },
    },
    outDir: resolve(__dirname, './dist'),
  },
});
