## 项目介绍

这一个基于 Electron 框架开发的在线音乐播放器项目，使用的技术栈有：

- Electron
- TypeScript
- SolidJS
- Tailwind CSS

## 备忘：

1. 遇到eslint无法识别路径别名的问题

    ```json
    "settings": {
        "import/resolver": {
          "alias": {
            "map": [
              ["~", "./src"]
            ],
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
      }
    ```

2. 配置 SolidJS 遇到的 `exports is not defined` 报错

    ```js
    {
        loader: 'babel-loader',
        options: {
          presets: ['solid', '@babel/preset-env', '@babel/preset-typescript'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs']
        },
    },
    ```

3. 需要优化的地方

    路径别名在 `tsconfig.json`、`.eslintrc.json`、`webpack.renderer.config.ts` 这三个文件中分别配置了一遍，重复配置不易维护，需要进行优化。
