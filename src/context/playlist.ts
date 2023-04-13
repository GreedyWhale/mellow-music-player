/*
 * @Description: 播放列表相关context
 * @Author: MADAO
 * @Date: 2023-03-30 15:59:36
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 15:01:47
 */
import { createStore, produce } from "solid-js/store";
import { createEffect } from 'solid-js';

import { db } from '~/lib/db';

export type PlaylistItem = {
  id: number;
  name: string;
  icon: string[];
  songs: { name: string; path: string; }[];
  createTimestamp: number;
};
export type Playlist = PlaylistItem[];
export type AddPlaylistItem = (payload: PlaylistItem) => void;
export type RemovePlaylistItem = (index: number) => void;
export type UpdatePlaylistItem = (payload: PlaylistItem, index: number) => void;
export type ContextPlaylist = {
  value: Playlist;
  addPlaylistItem: AddPlaylistItem;
  removePlaylistItem: RemovePlaylistItem;
  updatePlaylistItem: UpdatePlaylistItem;
};

export const initialPlaylist: ContextPlaylist = {
  value: [],
  addPlaylistItem: () => console.log('addPlaylistItem'),
  removePlaylistItem: () => console.log('removePlaylistItem'),
  updatePlaylistItem: () => console.log('replacePlaylistItem'),
};


export const usePlaylist = () => {
  const [playlist, setPlaylist] = createStore<Playlist>([]);

  const addPlaylistItem: AddPlaylistItem = async payload => {
    const id = await db.playlist.put(payload) as number;
    setPlaylist(
      produce(draft => { draft.push({ ...payload, id }); }),
    );
  };

  const removePlaylistItem: RemovePlaylistItem = index => setPlaylist(
    produce(draft => { draft.splice(index, 1); }),
  );

  const updatePlaylistItem: UpdatePlaylistItem = (payload, index) => setPlaylist(
    produce(draft => { draft.splice(index, 1, payload); }),
  );

  createEffect(() => {
    db.playlist.toArray().then(res => setPlaylist(res));
  });

  return {value: playlist, addPlaylistItem, removePlaylistItem, updatePlaylistItem};
};