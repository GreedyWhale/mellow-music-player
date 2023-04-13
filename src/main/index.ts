/*
 * @Description: https://github.com/electron/forge/blob/main/packages/template/webpack-typescript/tmpl/index.ts
 * @Author: MADAO
 * @Date: 2023-03-03 10:29:26
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 17:18:38
 */
import { app, BrowserWindow } from 'electron';

import { createBrowserWindow } from '~/lib/mainProcess';
import { bindListeners } from '~/lib/mainProcess/listeners';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = createBrowserWindow({
    routePath: '',
    config: {
      height: 650,
      width: 400,
    },
    onBeforeLoad: bindListeners,
  });

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
