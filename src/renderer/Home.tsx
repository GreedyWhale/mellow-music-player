import type { Component } from 'solid-js';
import type { PlaylistItem } from '~/context/playlist';

import { createEffect, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { Button } from '~/renderer/components/MimeticButton';
import { TitleBar } from '~/renderer/components/TitleBar';

import { useDialog } from '~/hooks/useDialog';
import { useMellowMusicPlayer } from '~/context/index';
import { useProcessMessage } from '~/hooks/useProcessMessage';
import { ACTION_ADD_PLAYLIST } from '~/lib/constants';
import { formatDate } from '~/lib/date';
// import { db } from '~/lib/db';
import { showEmoji } from '~/lib/emoji';

type CreatePalyListDialogPayload = {
  action: typeof ACTION_ADD_PLAYLIST,
  item: PlaylistItem;
};

export const Home: Component = () => {
  const navigate = useNavigate();

  const { message } = useProcessMessage();
  const { showDialog } = useDialog();
  const { playlist } = useMellowMusicPlayer();

  const handlePlaylistDialog = async () => {
    const dialogId = await showDialog({
      routePath: '/playlist/create',
      config: {
        width: 800,
        height: 600,
      }
    });

    const currentWindowId = await BridgeAPI.getWindowId();
    BridgeAPI.sendMessage({
      senderId: currentWindowId,
      receiverId: dialogId,
    });
  };

  // const addSongs = async (id: number) => {
  //   const pathsInfo = await BridgeAPI.getSongsPaths();
  //   if (pathsInfo.canceled) {
  //     return;
  //   }

  //   const regex = /\/([^/]+)\.(mp3|wav|ogg|flac|m4a)$/i;
  //   const songs = pathsInfo.filePaths.map(path => ({
  //     name: regex.exec(path)?.[1] ?? '',
  //     path,
  //   }));

  //   await db.playlist.update(id, { songs });
  //   const itemIndex = playlist.value.findIndex(value => value.id === id);
  //   if (itemIndex !== -1) {
  //     playlist.updatePlaylistItem({ ...playlist.value[itemIndex], songs }, itemIndex);
  //   }
  // };

  createEffect(() => {
    const payload = message()?.payload as CreatePalyListDialogPayload;
    if (payload && payload.action === ACTION_ADD_PLAYLIST) {
      playlist.addPlaylistItem(payload.item);
    }
  });

  return (
    <div>
      <TitleBar
        title='歌单'
        description={`${playlist.value.length}个已创建的歌单`}
        extra={(
          <Button
            icon='add'
            onClick={handlePlaylistDialog}
          />
        )}
      />

      <div class='p-4'>
        <div class='overflow-x-auto'>
          <ul class='flex flex-row'>
            <For each={playlist.value}>
              {(item) => (
                <li
                  class='bg-[#262A30] rounded-3xl text-white border-4 border-[#2A2E34] mb-5 px-4 py-5 flex-none w-[300px] [&:not(:last-child)]:mr-5'
                  onClick={() => navigate(`/playlist/${item.id}`)}
                >
                  <div class='flex items-center justify-between'>
                    <span class='text-lg'>{showEmoji(item.icon)}</span>
                    <Button icon='musicPlay' />
                  </div>

                  <div class='pt-10 flex items-start justify-between'>
                    <div>
                      <h5 class='bold mb-2 text-lg'>{item.name}</h5>
                      <p class='text-xs text-[#78818b]'>{formatDate(item.createTimestamp)}</p>
                    </div>
                    <div>
                      <p class='mb-2 text-sm'>歌曲数量</p>
                      <p class='text-xs text-[#78818b]'>{item.songs.length}</p>
                    </div>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
};
