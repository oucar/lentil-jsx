import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // @@TODO FIX THIS DEFINE!!
  define: {
    'process.env': process.env
  },
  plugins: [react()],
});
