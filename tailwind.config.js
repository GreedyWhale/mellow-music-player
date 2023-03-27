/*
 * @Description: https://tailwindcss.com/docs/guides/solidjs
 * @Author: MADAO
 * @Date: 2023-03-25 16:09:46
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-27 20:56:12
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-tl': 'radial-gradient(circle at top left, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
