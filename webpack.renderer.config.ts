/*
 * @Description: https://www.electronforge.io/
 * @Author: MADAO
 * @Date: 2023-02-24 15:12:21
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-02 10:46:47
 */
import type { Configuration } from 'webpack';

import path from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
