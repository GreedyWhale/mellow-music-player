import type { Component, JSXElement } from "solid-js";

import { Line } from './Line';

type TitleBarProps = {
  title: string;
  description?: string;
  extra?: JSXElement;
};

export const TitleBar: Component<TitleBarProps> = (props) => {
  return (
    <header class="pt-8">
      <div class="mb-5 flex items-center justify-between px-5">
        <div class="text-white">
          <h1 class="mb-1 text-2xl font-bold">{props.title}</h1>
          {props.description && (
            <p class="text-sm opacity-40">{props.description}</p>
          )}
        </div>
        {props.extra && props.extra}
      </div>
      <Line />
    </header>
  );
};
