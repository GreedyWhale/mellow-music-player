import type { Component } from 'solid-js';

import { Button } from '~/renderer/components/MimeticButton';

export const Home: Component = () => {
  return (
    <div>
      <header class='pt-8 px-5 flex justify-between items-center'>
        <div class='text-white'>
          <h1 class='font-bold text-2xl mb-1'>播放列表</h1>
          <p class='text-sm opacity-40'>16个已创建的播放列表</p>
        </div>

        <Button />
      </header>
    </div>
  );
};
