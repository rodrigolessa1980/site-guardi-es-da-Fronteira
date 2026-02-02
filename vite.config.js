import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Assets: imagens, logo e cães servidos a partir da pasta public
  publicDir: 'public',
})
