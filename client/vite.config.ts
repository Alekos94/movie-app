import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allows access via LAN IP
    port: 5173
  },
  plugins: [react()],
})
