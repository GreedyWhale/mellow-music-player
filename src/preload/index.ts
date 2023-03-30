/*
 * @Description: 预加载脚本
 * @Author: MADAO
 * @Date: 2023-03-03 15:28:55
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-30 17:09:20
 */
import { contextBridge, ipcRenderer } from 'electron';

import {
  EVENT_CREATE_BROWSER_WINDOW,
  EVENT_WINDOW_MESSAGE,
  EVENT_GET_WINDOW_ID,
} from '~/lib/constants';

const bridgeAPI: typeof BridgeAPI = {
  createBrowserWindow: (params) => ipcRenderer.invoke(EVENT_CREATE_BROWSER_WINDOW, params),
  onMessage: callback => {
    const listener = (event: Electron.IpcRendererEvent, action: string) => callback(action);

    ipcRenderer.on(EVENT_WINDOW_MESSAGE, listener);
    return () => ipcRenderer.off(EVENT_WINDOW_MESSAGE, listener);
  },
  sendMessage: action => ipcRenderer.sendTo(action.receiverId, EVENT_WINDOW_MESSAGE, JSON.stringify(action)),
  getWindowId: () => ipcRenderer.invoke(EVENT_GET_WINDOW_ID)
};

contextBridge.exposeInMainWorld('BridgeAPI', bridgeAPI);

console.log('preload');
