import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          content_script: resolve(__dirname, 'src/content_script.ts'),
          popup: resolve(__dirname, 'src/popup.ts'),
          service_worker: resolve(__dirname, 'src/service_worker.ts'),
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  };
});
