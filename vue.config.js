const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");
let proxy = {};
// if (process.env.VUE_APP_MODE === "dev") {
//   proxy = {
//     "/example": {
//       target: "exampleUrl",
//       changeOrigin: true,
//     },
//   };
// }

module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: "src/main.ts",
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
  lintOnSave: false,
  // 生产阶段的sourceMap 加快生产构建
  productionSourceMap: false,
  //webpack 配置的项目名称
  devServer: {
    hot: true,
    port: 1234,
    host: "0.0.0.0",
    // host: "localhost",
    open: false,
    client: {
      overlay: {
        warnings: false,
        errors: false,
        // runtimeErrors: (error) => {
        //   return false;
        //   // if (error.message === "ResizeObserver loop limit exceeded") {
        //   //   return false;
        //   // } else if (
        //   //   error.message ===
        //   //   "ResizeObserver loop completed with undelivered notifications"
        //   // ) {
        //   //   return false;
        //   // }
        //   // return true;
        // },
      },
    },
    //服务转发
    // proxy,
  },
  // 其他环境设置hash值
  chainWebpack: (config) => {
    config.output
      .filename("assets/js/[name].[hash].js")
      .chunkFilename("assets/js/[name].[hash].js")
      .end();
    // 如果filenameHashing设置为了false，可以通过这段代码给打包出的css文件增加hash值
    // config.plugin('extract-css').tap(args => [{
    //   filename: 'assets/css/[name].[hash].css',
    //   chunkFilename: 'assets/css/[name].[hash].css'
    // }])
  },
  configureWebpack: {
    optimization: {
      nodeEnv: false,
    },
    plugins: [
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
              "NButton",
            ],
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
