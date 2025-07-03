import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://lms-learning-management-system-gold.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
