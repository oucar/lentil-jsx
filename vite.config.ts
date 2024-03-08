import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // @@TODO FIX THIS DEFINE!!
  define: {
    'process.env.NODE_ENV': '"process.env.NODE_ENV"',
  },
  plugins: [react()],
});
