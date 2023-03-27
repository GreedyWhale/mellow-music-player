/*
 * @Description: https://cn.vitejs.dev/config/
 * @Author: MADAO
 * @Date: 2023-02-05 02:57:01
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-27 14:35:45
 */
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => ({
  root: path.join(__dirname, '/src/renderer'),
  base: mode === 'development' ? '/' : './',
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    emptyOutDir: true,
    outDir: path.join(__dirname, '/dist/renderer'),
  },
}));
