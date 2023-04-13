import type { Component, JSXElement } from 'solid-js';
import type { ContextPlaylist } from './playlist';

import { createContext, useContext } from 'solid-js';

import { usePlaylist, initialPlaylist } from './playlist';

type MellowMusicPlayerContextValue = {
  playlist: ContextPlaylist;
};

const MellowMusicPlayerContext = createContext<MellowMusicPlayerContextValue>({
  playlist: initialPlaylist,
});

export const MellowMusicPlayerProvider: Component<{children?: JSXElement}> = props => {
  const playlist = usePlaylist();
  const store: MellowMusicPlayerContextValue = {
    playlist,
  };

  return (
    <MellowMusicPlayerContext.Provider value={store}>
      {props.children}
    </MellowMusicPlayerContext.Provider>
  );
};

export const useMellowMusicPlayer = () => useContext(MellowMusicPlayerContext);
