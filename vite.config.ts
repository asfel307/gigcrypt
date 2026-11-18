import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GigCrypt deploys as a static site (GitHub Pages). Base './' keeps
// asset paths working when served from a project sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
})
