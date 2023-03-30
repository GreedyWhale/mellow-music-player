/*
 * @Description: 监听窗口信息
 * @Author: MADAO
 * @Date: 2023-03-28 16:57:25
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-30 17:09:41
 */
import type { Action } from '~/types/global';

import { onMount, onCleanup, createSignal } from 'solid-js';

export const useProcessMessage = () => {
  const [action, setAction] = createSignal<Action<unknown>>();

  let removeMessageLister: () => void;

  onMount(() => {
    removeMessageLister = BridgeAPI.onMessage((action) => setAction(JSON.parse(action)));
  });

  onCleanup(() => removeMessageLister?.());

  return { message: action };
};