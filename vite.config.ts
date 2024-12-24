import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'esnext', // Ensure modern JavaScript features are supported
    outDir: 'dist',   // Ensure Vite outputs to the correct directory
  },
  plugins: [react()],
})
