import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "@/App.vue";
import "@/style/base/main.css";
import "@/style/base/tailwind.css";
import "@/router/permit";
const pinia = createPinia();
const app = createApp(App);
// 自定义指令，点击元素外隐藏元素
app.directive("hide", {
  mounted(el, binding) {
    el.handler = function (e: any) {
      const isContain = el.contains(e.target);
      console.log("isContain", isContain);
      // 如果点击范围在绑定的元素范围内，那么将不执行指令操作，而是执行原点击事件
      if (isContain) return;
      if (typeof binding.value === "function") {
        // 绑定给指令的如果是一个函数，那么将回调并指定this
        binding.value();
        // 解除事件绑定
        // document.removeEventListener('click', el.handler);
      }
    };
    // 监听全局的点击事件
    // document.addEventListener('click', el.handler);
    // 如果同步绑定全局事件不生效，可以采用异步的方式
    document.addEventListener("click", el.handler);
  },
  unmounted(el) {
    console.log("解绑");
    document.removeEventListener("click", el.handler);
  },
});

// 下拉超过滚动高度就执行操作(一般是获取数据)
app.directive("loadmore", {
  mounted(el, binding) {
    el.loadmore = function () {
      const condition =
        Math.floor(el.scrollHeight - el.scrollTop) <= el.clientHeight;
      if (!condition) return;
      if (typeof binding.value === "function") {
        binding.value();
        // el.removeEventListener('scroll', el.loadmore);
      }
    };
    el.addEventListener("scroll", el.loadmore);
  },
  unmounted(el) {
    el.removeEventListener("scroll", el.loadmore);
  },
});
app.use(router).use(pinia).mount("#app");
