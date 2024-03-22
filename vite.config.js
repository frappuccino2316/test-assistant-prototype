import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/content_script.ts'),
        },
        output: {
          entryFileNames: 'content_script.js',
        },
      },
    },
  };
});
