import { createStore, produce } from "solid-js/store";

export type PlaylistItem = {
  name: string;
  icon: string[];
  songs: { name: string }[]
};
export type Playlist = PlaylistItem[];
export type AddPlaylistItem = (payload: PlaylistItem) => void;
export type RemovePlaylistItem = (index: number) => void;
export type ReplacePlaylistItem = (payload: PlaylistItem, index: number) => void;


export const usePlaylist = () => {
  const [playlist, setPlaylist] = createStore<Playlist>([]);

  const addPlaylistItem: AddPlaylistItem = payload => setPlaylist(
    produce(draft => { draft.push(payload); }),
  );

  const removePlaylistItem: RemovePlaylistItem = index => setPlaylist(
    produce(draft => { draft.splice(index, 1); }),
  );

  const replacePlaylistItem: ReplacePlaylistItem = (payload, index) => setPlaylist(
    produce(draft => { draft.splice(index, 1, payload); }),
  );

  return {playlist, addPlaylistItem, removePlaylistItem, replacePlaylistItem};
};