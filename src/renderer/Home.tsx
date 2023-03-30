import type { Component } from 'solid-js';
import type { PlaylistItem } from '~/context/playlist';

import { createEffect } from 'solid-js';

import { Button } from '~/renderer/components/MimeticButton';
import { TitleBar } from '~/renderer/components/TitleBar';

import { useDialog } from '~/hooks/useDialog';
import { useMellowMusicPlayer } from '~/context/index';
import { useProcessMessage } from '~/hooks/useProcessMessage';
import { ACTION_ADD_PLAYLIST } from '~/lib/constants';

type CreatePalyListDialogPayload = {
  action: typeof ACTION_ADD_PLAYLIST,
  item: PlaylistItem;
};

export const Home: Component = () => {
  const { message } = useProcessMessage();
  const { showDialog } = useDialog();
  const { playlistInfo } = useMellowMusicPlayer();

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

  createEffect(() => {
    const payload = message()?.payload as CreatePalyListDialogPayload;
    if (payload && payload.action === ACTION_ADD_PLAYLIST) {
      playlistInfo.addPlaylistItem(payload.item);
    }
  });

  return (
    <div>
      <TitleBar
        title='歌单'
        description={`${playlistInfo.playlist.length}个已创建的歌单`}
        extra={(
          <Button
            icon='add'
            onClick={handlePlaylistDialog}
          />
        )}
      />
    </div>
  );
};
