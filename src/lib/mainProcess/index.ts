/*
 * @Description: 用于主进程的工具函数
 * @Author: MADAO
 * @Date: 2023-04-12 14:47:37
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 14:48:40
 */
import type { CreateBrowserWindowParams } from '~/types/global';

import { BrowserWindow, app } from 'electron';
import merge from 'lodash/merge';
import path from 'path';
import fs from 'fs';

type MainProcessCreateBrowserWindowParams = CreateBrowserWindowParams & {
  onBeforeLoad: (browserWindow: BrowserWindow) => void;
}

// 递归遍历目录
export const traverseDir = (dirPath: string, filesArray: string[]) => {
  // 检查当前路径是否是目录
  if (fs.statSync(dirPath).isDirectory()) {
    // 读取目录下的文件路径
    const files = fs.readdirSync(dirPath);

    // 遍历文件路径，对每个文件路径执行以上步骤，直到所有路径都为文件为止
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      traverseDir(filePath, filesArray);
    });
  } else if (/\.(mp3|wav|ogg|flac|m4a)$/.test(dirPath)){
    // 如果当前路径是文件，则把最终的文件路径存入数组中
    filesArray.push(dirPath);
  }
};

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