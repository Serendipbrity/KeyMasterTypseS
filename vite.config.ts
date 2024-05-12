import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/KeyMasterTypeS/',
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensures that the build output goes to the 'dist' directory
  },
  server: {
    port: 3000,
    open: true
  }
})
