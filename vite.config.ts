import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const domain = 'https://mpf29a7598a09244394d.free.beeceptor.com'
// const domain = 'https://intuit-fe.free.beeceptor.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/example-turnstile': {
        target: `${domain}/example/turnstile`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/example-turnstile/, ''),
      },
      '/example-trafficlight': {
        target: `${domain}/example/trafficlight`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/example-trafficlight/, ''),
      }
    }
  },
})
