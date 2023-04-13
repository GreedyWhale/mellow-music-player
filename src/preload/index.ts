/*
 * @Description: 预加载脚本
 * @Author: MADAO
 * @Date: 2023-03-03 15:28:55
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 12:27:06
 */
import { contextBridge, ipcRenderer } from 'electron';

import {
  EVENT_CREATE_BROWSER_WINDOW,
  EVENT_WINDOW_MESSAGE,
  EVENT_GET_WINDOW_ID,
  EVENT_CLOSE_WINDOW,
  EVENT_GET_SONGS_PATHS,
} from '~/lib/constants';

const bridgeAPI: typeof BridgeAPI = {
  createBrowserWindow: (params) => ipcRenderer.invoke(EVENT_CREATE_BROWSER_WINDOW, params),
  onMessage: callback => {
    const listener = (event: Electron.IpcRendererEvent, action: string) => callback(action);

    ipcRenderer.on(EVENT_WINDOW_MESSAGE, listener);
    return () => ipcRenderer.off(EVENT_WINDOW_MESSAGE, listener);
  },
  sendMessage: action => ipcRenderer.sendTo(action.receiverId, EVENT_WINDOW_MESSAGE, JSON.stringify(action)),
  getWindowId: () => ipcRenderer.invoke(EVENT_GET_WINDOW_ID),
  closeWindow: () => ipcRenderer.send(EVENT_CLOSE_WINDOW),
  getSongsPaths: () => ipcRenderer.invoke(EVENT_GET_SONGS_PATHS)
};

contextBridge.exposeInMainWorld('BridgeAPI', bridgeAPI);
