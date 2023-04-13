/*
 * @Description: 主进程监听器
 * @Author: MADAO
 * @Date: 2023-04-12 14:47:46
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 14:50:29
 */
import type { CreateBrowserWindowParams } from '~/types/global';

import { ipcMain, dialog } from 'electron';

import {
  EVENT_CREATE_BROWSER_WINDOW,
  EVENT_GET_WINDOW_ID,
  EVENT_CLOSE_WINDOW,
  EVENT_GET_SONGS_PATHS
} from '~/lib/constants';

import { traverseDir, createBrowserWindow } from './index';


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

  ipcMain.handle(EVENT_GET_SONGS_PATHS, async event => {
    const result = await dialog.showOpenDialog({
      title: '请选择要添加到歌单的歌曲',
      filters: [
        { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'm4a'] },
      ],
      properties: ['openFile', 'openDirectory', 'multiSelections'],
    });

    if (!result.canceled) {
      const filePaths = result.filePaths.reduce<string[]>((prev, current) => {
        const filesArray: string[] = [];
        traverseDir(current, filesArray);
        return prev.concat(filesArray);
      }, []);

      result.filePaths = filePaths;
    }

    if (!event.sender.isDestroyed()) {
      return result;
    }
  });

  ipcMain.on(EVENT_CLOSE_WINDOW, event => {
    if (!event.sender.isDestroyed()) {
      event.sender.close();
    }
  });
};
