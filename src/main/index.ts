/*
 * @Description: https://github.com/electron/forge/blob/main/packages/template/webpack-typescript/tmpl/index.ts
 * @Author: MADAO
 * @Date: 2023-03-03 10:29:26
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-29 11:48:40
 */
import { app, BrowserWindow } from 'electron';

import { createBrowserWindow, bindListeners } from '~/lib/mainProcess';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = createBrowserWindow({
    routePath: '',
    config: {
      height: 500,
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
