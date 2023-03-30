/*
 * @Description: 创建窗口方法
 * @Author: MADAO
 * @Date: 2023-03-28 10:52:54
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-29 11:51:11
 */
import type { CreateBrowserWindowParams } from '~/types/global';

import { BrowserWindow, app, ipcMain } from 'electron';
import merge from 'lodash/merge';
import path from 'path';

import { EVENT_CREATE_BROWSER_WINDOW, EVENT_GET_WINDOW_ID } from '~/lib/constants';

type MainProcessCreateBrowserWindowParams = CreateBrowserWindowParams & {
  onBeforeLoad: (browserWindow: BrowserWindow) => void;
}

export const createBrowserWindow = (params: MainProcessCreateBrowserWindowParams) => {
  const defaultConfig: Electron.BrowserWindowConstructorOptions = {
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  };

  const newWindow = new BrowserWindow(merge(defaultConfig, params.config));
  params.onBeforeLoad(newWindow);

  const encodedRoutePath = params.routePath ? `?routePath=${encodeURIComponent(params.routePath)}` : '';
  if (app.isPackaged) {
    newWindow.loadFile(path.join(__dirname, `../renderer/index.html${encodedRoutePath}`));
  } else {
    newWindow.loadURL(`http://localhost:3000${encodedRoutePath}`);
  }

  return newWindow;
};

export const bindListeners = () => {
  ipcMain.handle(EVENT_CREATE_BROWSER_WINDOW, async (event, params: CreateBrowserWindowParams) => {
    if (event.sender.isDestroyed()) {
      return;
    }

    return new Promise(resolve => {
      createBrowserWindow({
        ...params,
        onBeforeLoad: (browserWindow) => {
          browserWindow.webContents.once('did-finish-load', () => resolve(browserWindow.webContents.id));
        },
      });
    });
  });

  ipcMain.handle(EVENT_GET_WINDOW_ID, event => event.sender.id);
};
