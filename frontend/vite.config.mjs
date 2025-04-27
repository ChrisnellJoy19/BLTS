import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Ensures that the output goes into the 'dist' folder
    rollupOptions: {
      input: path.resolve(__dirname, 'frontend/index.html'), // Explicitly point to the index.html file
    },
  },
});
