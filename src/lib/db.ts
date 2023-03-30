/*
 * @Description: 数据库相关方法
 * @Author: MADAO
 * @Date: 2023-03-30 11:22:33
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-30 11:24:36
 */
import PouchDB from 'pouchdb';

export const getDatabase = () => new PouchDB('mellow_musics_player_v1');