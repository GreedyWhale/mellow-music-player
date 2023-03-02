/*
 * @Description: https://www.electronforge.io/
 * @Author: MADAO
 * @Date: 2023-02-24 15:12:21
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-02 11:27:50
 */
import type { Configuration } from 'webpack';

import path from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
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
