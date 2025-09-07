import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import {devDependencies,dependencies} from './package.json'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ulens-ui-kit',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react/jsx-runtime',...Object.keys(devDependencies), ...Object.keys(dependencies)],
    },
    target: 'esnext',
    sourcemap: true,
  },
})