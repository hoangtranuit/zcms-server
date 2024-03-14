import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssNesting from 'postcss-nesting';
import mockSimple from 'vite-plugin-mock-simple'
import mock from './mock/index.mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mockSimple(mock)
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssNesting
      ],
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  server: {
    open: true,
    port: 3001,
  }
})
