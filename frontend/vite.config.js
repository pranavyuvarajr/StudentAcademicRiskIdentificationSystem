import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/auth':          'http://localhost:8080',
      '/students':      'http://localhost:8080',
      '/comments':      'http://localhost:8080',
      '/users':         'http://localhost:8080',
      '/swagger-ui':    'http://localhost:8080',
      '/v3':            'http://localhost:8080',
    }
  }
})
