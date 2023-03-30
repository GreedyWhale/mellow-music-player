/*
 * @Description: https://tailwindcss.com/docs/guides/solidjs
 * @Author: MADAO
 * @Date: 2023-03-25 16:09:46
 * @LastEditors: MADAO
 * @LastEditTime: 2023-03-29 15:48:15
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
        'gradient-button': 'linear-gradient(to right, #BA1D0D, #DB4508)',
      }
    },
  },
  plugins: [],
};
