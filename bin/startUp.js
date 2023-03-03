/*
 * @Description: 开发模式启动脚本
 * @Author: MADAO
 * @Date: 2023-03-03 14:37:31
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-03 15:21:56
 */
const { spawn } = require('child_process');
const path = require('path');
const { createServer, build } = require('vite');
const electronPath = require('electron');

let electronMainProcess = null;

const main = async () => {
  // 启动渲染进程
  const server = await createServer({ configFile: path.join(__dirname, '../vite.renderer.config.ts') });
  await server.listen();

  // 构建渲染进程文件
  await build({
    configFile: path.join(__dirname, '../vite.preload.config.ts'),
    build: {
      watch: {},
    },
    plugins: [
      {
        name: 'vite-plugin-electron-hmr',
        closeBundle: () => {
          server.ws.send({ type: 'full-reload' });
        }
      }
    ]
  });

  // 构建主进程文件
  build({
    configFile: path.join(__dirname, '../vite.main.config.ts'),
    build: {
      watch: {},
    },
    plugins: [
      {
        name: 'vite-plugin-electron-reload',
        closeBundle: () => {
          if (electronMainProcess) {
            electronMainProcess.kill();
          }

          electronMainProcess = spawn(electronPath, ['.'], { stdio: 'inherit' });
        }
      }
    ]
  });
}

main();
