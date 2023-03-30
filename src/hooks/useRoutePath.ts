/*
 * @Description: 自动跳转hook
 * @Author: MADAO
 * @Date: 2023-03-28 21:28:08
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-28 21:35:46
 */
import { useSearchParams, useNavigate } from "@solidjs/router";
import { createEffect } from 'solid-js';

export const useRoutePath = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  createEffect(() => {
    const routePath = searchParams.routePath;
    if (routePath && routePath !== '/') {
      navigate(routePath);
    }
  });
};