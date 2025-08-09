import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs', // Cambia 'dist' por el nombre de la carpeta que desees, por ejemplo: '../server/public'
  },
})
