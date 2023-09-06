import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "@/views/Main/HelloWorld.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/404page.vue"),
  },
  {
    path: "/",
    name: "home",
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
