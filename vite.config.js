import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 Make sure this is included
  ],
  theme: {
    extend: {},
  },
  plugins: [react(), tailwind()],
})
