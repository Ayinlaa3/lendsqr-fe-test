// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ✅ Use the alias we defined so Vite can resolve it
        additionalData: `@import "@/styles/globals.scss";`,
      },
    },
  },
})
