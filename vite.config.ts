import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webcrypto as crypto } from 'crypto';

Object.defineProperty(globalThis, 'crypto', {
  value: crypto,
  writable: false,
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


