/*
 * @Description: 数据库相关方法
 * @Author: MADAO
 * @Date: 2023-03-30 11:22:33
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-12 10:35:17
 */
import type { PlaylistItem } from '~/context/playlist';

import Dexie, { Table } from 'dexie';


export class MellowMusicDB extends Dexie {
  playlist!: Table<PlaylistItem & {id?: number}>;

  constructor() {
    super('MellowMusicDB');
    this.version(1).stores({
      playlist: '++id, name, icon, songs, createTimestamp'
    });
  }
}

export const db = new MellowMusicDB();
