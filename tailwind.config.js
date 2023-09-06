/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "2285px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // 上面的是默认断点
      // 下面为自定义断点
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
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
    require("@tailwindcss/line-clamp"),
    require("animated-tailwindcss"),
  ],
  // 可以自定义一些css类名
  extend: {},
  corePlugins: {
    preflight: true, // 禁止tailwindcss的默认属性base，防止和组件库的样式产生冲突
  },
  postcss: {
    options: {
      implement: true,
    },
  },
};
