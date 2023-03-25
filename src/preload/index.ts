/*
 * @Description: 预加载脚本
 * @Author: MADAO
 * @Date: 2023-03-03 15:28:55
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-25 15:23:20
 */
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})

console.log('preload');

