import type { Component, JSXElement } from 'solid-js';
import type { Playlist, AddPlaylistItem, RemovePlaylistItem, ReplacePlaylistItem } from './playlist';

import { createContext, useContext } from 'solid-js';

import { usePlaylist } from './playlist';

type MellowMusicPlayerContextValue = {
  playlistInfo: {
    playlist: Playlist;
    addPlaylistItem: AddPlaylistItem;
    removePlaylistItem: RemovePlaylistItem;
    replacePlaylistItem: ReplacePlaylistItem;
  }
};

const MellowMusicPlayerContext = createContext<MellowMusicPlayerContextValue>({
  playlistInfo: {
    playlist: [],
    addPlaylistItem: () => console.log('addPlaylistItem'),
    removePlaylistItem: () => console.log('removePlaylistItem'),
    replacePlaylistItem: () => console.log('replacePlaylistItem'),
  },
});

export const MellowMusicPlayerProvider: Component<{children?: JSXElement}> = props => {
  const playlist = usePlaylist();
  const store: MellowMusicPlayerContextValue = {
    playlistInfo: playlist,
  };

  return (
    <MellowMusicPlayerContext.Provider value={store}>
      {props.children}
    </MellowMusicPlayerContext.Provider>
  );
};

export const useMellowMusicPlayer = () => useContext(MellowMusicPlayerContext);
