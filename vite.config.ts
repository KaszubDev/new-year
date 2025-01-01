import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  base: '/new-year/',
  plugins: [
    react(), 
    glsl(), 
    checker({ typescript: false }),
  ],
})
