/*
 * @Description: 创建窗口hook
 * @Author: MADAO
 * @Date: 2023-03-28 17:12:45
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-30 16:48:54
 */
import type { Action, CreateBrowserWindowParams } from '~/types/global';

export type DialogAction = Action<{ buttonIndex: number }>;
export type DialogCallback = (action: DialogAction) => void;


export const useDialog = () => {
  const showDialog = async (params: CreateBrowserWindowParams) => {
    const windowId = await BridgeAPI.createBrowserWindow(params);
    return windowId;
  };

  return { showDialog };
};