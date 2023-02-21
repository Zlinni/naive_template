import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/style/style.css";
import "@/style/main.css";
import "@/style/tailwind.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
