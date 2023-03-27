/*
 * @Description: https://github.com/electron/forge/blob/main/packages/template/webpack-typescript/tmpl/index.ts
 * @Author: MADAO
 * @Date: 2023-03-03 10:29:26
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-27 15:40:16
 */
import { app, BrowserWindow } from 'electron';
import path from 'path';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 400,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }

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
