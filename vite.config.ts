import preact from '@preact/preset-vite';

import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  test: {
    globals: true, // Use global test functions like `describe`, `it`, etc.
    environment: 'jsdom', // Use jsdom environment (for DOM-related tests)
    setupFiles: './tests/setup.ts' // Optional: setup file for global test configuration
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/api/index'),
      '@components': path.resolve(__dirname, './src/components'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  define: {
    global: 'globalThis'
  }
});
