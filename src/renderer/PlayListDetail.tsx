import type { Component } from "solid-js";

import { useParams, useNavigate } from '@solidjs/router';
import { createMemo, For } from 'solid-js';

import { TitleBar } from '~/renderer/components/TitleBar';
import { Button } from "~/renderer/components/MimeticButton";
import { Line } from "~/renderer/components/Line";

import { useMellowMusicPlayer } from '~/context/index';

export const PlayListDetail: Component = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { playlist } = useMellowMusicPlayer();

  const currentItem = createMemo(() => playlist.value.find(item => item.id === parseInt((params.id as string), 10)));

  return (
    <div>
      <TitleBar
        title={currentItem()?.name ?? '未知'}
        extra={
          <Button
            icon='back'
            onClick={() => navigate('/', { replace: true })}
          />
        }
      />

      <div class="flex items-center justify-between py-6 px-5">
        <Button icon='musicAdd' classNames='mr-4 scale-75' />
        <Button icon='edit' classNames='scale-75' />
        <div class="flex-1" />
        <Button icon='musicPlay' classNames='scale-75' />
      </div>
      <Line />

      <ul class="h-[300px] overflow-y-auto">
        <For each={currentItem()?.songs}>
          {item => (
            <li class="flex items-center justify-between px-5 py-4 text-[#B3B5B5]">
              <span>{item.name}</span>
              <Button icon='musicPlay' classNames="scale-75"/>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};