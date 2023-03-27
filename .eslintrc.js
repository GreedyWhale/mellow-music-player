/*
 * @Description: https://www.npmjs.com/package/eslint-plugin-solid
 * @Author: MADAO
 * @Date: 2023-03-27 15:14:22
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-27 15:25:31
 */
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:solid/typescript"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "solid"
  ],
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"]
  }
};
