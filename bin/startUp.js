/*
 * @Description: 开发模式启动脚本
 * @Author: MADAO
 * @Date: 2023-03-03 14:37:31
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-25 15:46:07
 */
const { spawn } = require('child_process');
const { createServer, build, createLogger } = require('vite');
const path = require('path');
const electronPath = require('electron');
const colors = require('picocolors');

const logger = createLogger('info');
let electronMainProcess = null;


const main = async () => {
  logger.info(colors.green('启动renderer进程开发服务器'));
  const server = await createServer({
    mode: 'development',
    configFile: path.join(__dirname, '../vite.renderer.config.ts'),
  });
  await server.listen();

  logger.info(colors.green('构建preload.js文件'));
  await build({
    configFile: path.join(__dirname, '../vite.preload.config.ts'),
    build: {
      watch: {},
    },
    plugins: [
      {
        name: 'vite-plugin-electron-hmr',
        closeBundle: () => {
          logger.info(colors.green('preload.js文件构建完成'));
          server.ws.send({ type: 'full-reload' });
        }
      }
    ]
  });

  logger.info(colors.green('构建main进程文件'));
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

          logger.info(colors.green('main进程文件构建完成'));
          electronMainProcess = spawn(electronPath, ['.'], { stdio: 'inherit' });
        }
      }
    ]
  });
}

main();
