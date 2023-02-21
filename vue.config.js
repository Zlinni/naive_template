/* eslint-disable */
const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
  },
  // 构建依赖babel全转换
  transpileDependencies: true,
  publicPath: "/",
  // 构建之后的目录名字
  outputDir: "dist",
  // 构建之后静态资源存放的目录名字
  assetsDir: "static",
  // 生产中禁用eslint报错
  // lintOnSave: process.env.NODE_ENV !== 'production',
  // 生产阶段的sourceMap 加快生产构建
  productionSourceMap: false,
  //webpack 配置的项目名称
  devServer: {
    hot: true,
    port: 1222,
    host: "0.0.0.0",
    // host: "localhost",
    open: false,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    // proxy: {
    //   "/proxy": {
    //     target: "http://192.168.11.169:8000",
    //     // target: "https://musedash-test.peropero.net",
    //     // target: "https://stg-prpr-muse-dash.peropero.net",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/proxy': ''
    //     }
    //   },
    // },
  },
  configureWebpack: {
    // resolve: {extensions: ['.js', '.vue',".ts", ".tsx", ".json"]},
    // module: {
    //   rules: [
    //     { test: /\.ts$/, loader: "ts-loader" },
    //     { test: /\.vue$/, loader: "vue-loader" },
    //   ]
    // },
    plugins: [
      // vue(),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar", "NButton"],
          },
        ],
        // eslint报错解决
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});
