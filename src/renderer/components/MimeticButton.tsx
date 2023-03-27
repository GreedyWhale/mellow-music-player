import type { Component } from 'solid-js';

import { createSignal } from 'solid-js';
import clsx from 'clsx';

export const Button: Component = () => {
  const [active, setActive] = createSignal(false);

  return (
    <div class='relative z-10' onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}>
      <button
        class='w-[40px] h-[40px] rounded-full bg-gradient-radial-tl from-[#2E3238] to-[#1D1F22] z-[1]'
      />
      <div class={clsx(
        'w-[44px] h-[44px] bg-gradient-to-br from-[#2B3036] to-[#292a2a] absolute top-[-2px] left-[-2px] z-[-1] rounded-full shadow-[4px_4px_12px_3px_rgba(0,0,0,.4),-3px_-2px_12px_#575c64] transition-all',
        active() && '!shadow-[inset_-3px_-2px_12px_#292b2f,inset_4px_4px_12px_3px_rgba(0,0,0,.4)]'
      )}/>
    </div>
  );
};