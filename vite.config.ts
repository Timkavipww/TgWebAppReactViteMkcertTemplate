import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [
    react(),        // поддержка React + JSX/TSX
    mkcert(),       // локальный HTTPS для Telegram WebApp
    tailwindcss(),  // TailwindCSS
  ],
})