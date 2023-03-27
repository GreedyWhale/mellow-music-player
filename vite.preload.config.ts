/*
 * @Description: https://cn.vitejs.dev/guide/build.html#library-mode
 * @Author: MADAO
 * @Date: 2023-03-03 10:20:10
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-27 15:26:19
 */
import { defineConfig } from 'vite';
import { builtinModules } from 'node:module';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  root: path.join(__dirname, '/src/preload'),
  resolve: {
    alias: {
      '~': path.join(__dirname, './src')
    }
  },
  build: {
    outDir: path.join(__dirname, '/dist/preload'),
    emptyOutDir: true,
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['electron', ...builtinModules.flatMap(item => ([item, `node:${item}`]))]
    }
  },
});
