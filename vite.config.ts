import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ['pdfjs-dist'],   // 👈 Force Vite to include pdfjs-dist
    exclude: ['lucide-react'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  worker: {
    format: 'es', // 👈 Required for PDF.js worker
  },

  appType: 'spa',

  server: {
    fs: {
      strict: false,
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
