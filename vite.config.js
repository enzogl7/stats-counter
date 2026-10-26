import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { desktopPages } from './scripts/desktop-pages.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    desktopPages()],
  base: '/',

})
