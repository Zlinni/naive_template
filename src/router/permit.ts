// 路由守卫
import router from "@/router";
import { TOKEN_NAME } from "@/config/keyWord";

// 设置无需鉴权的路径
const allowEnterPath: string[] = ["/login", "/404"];
router.beforeEach(async (to, from, next) => {
  if (!localStorage.getItem(TOKEN_NAME)) {
    const allowRoute: boolean = allowEnterPath.some((path) => to.path === path);
    if (!allowRoute) {
      // TODO
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});
router.afterEach(async (to) => {
  const routeName = to.name as string;
  // 请求
  return;
});
