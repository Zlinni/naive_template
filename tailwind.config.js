/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        origin: {
          50: "#f7abb9",
          100: "#ff1f96",
          150: "ff0087",
        },
      },
    },
  },
  plugins: [
    // require("@tailwindcss/line-clamp"),
    // require('tailwindcss-animate'),
    // require("animated-tailwindcss"),
  ],
  // 可以自定义一些css类名
  extend: {},
  corePlugins: {
    preflight: true, // 禁止tailwindcss的默认属性base，防止和组件库的样式产生冲突
  },
};
