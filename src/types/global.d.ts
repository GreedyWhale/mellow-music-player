/*
 * @Description: BridgeAPI对象类型声明
 * @Author: MADAO
 * @Date: 2023-03-28 11:14:54
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 12:26:49
 */


export type Action<T> = {
  senderId: number; // 发送方id
  receiverId: number; // 接收方id
  payload?: T;
};

export type CreateBrowserWindowParams = {
  routePath: string,
  config: Electron.BrowserWindowConstructorOptions
};

declare global {
  const BridgeAPI: {
    createBrowserWindow: (params: CreateBrowserWindowParams) => Promise<number>;
    onMessage: (callback: <T>(action: string) => unknown) => (() => void);
    sendMessage: <T>(action: Action<T>) => void;
    getWindowId: () => Promise<number>;
    closeWindow: () => void;
    getSongsPaths: () => Promise<Electron.OpenDialogReturnValue>;
  };
}
