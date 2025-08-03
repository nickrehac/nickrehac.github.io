import { defineConfig } from 'vite'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from "node:url"

import react from '@vitejs/plugin-react'

// https://vite.dev/config/

const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src", "index.html"),
        notfound: resolve(__dirname, "src", "404.html"),
        darling: resolve(__dirname, "src", "darling.html")
      }
    }
  }
})