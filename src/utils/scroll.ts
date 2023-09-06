// 滚动控制器
export class ScrollHandler {
  containerId: string;
  callBack: ((...args: any) => void) | undefined;
  markFn: any;
  constructor() {
    // 容器id
    this.containerId = "";
    // 回调函数
    this.callBack = undefined;
    // 记忆函数
    this.markFn = undefined;
  }
  //   初始化容器
  initContainer(containerId: string) {
    this.containerId = containerId;
  }
  //   初始化回调
  initCallBack(callBack: ((...args: any) => void) | undefined) {
    this.callBack = callBack;
  }
  // 根据不太的容器Id 分发不同的触底函数 函数的作用是判断是否触底
  hitBottom(Callback: ((...args: any) => void) | undefined) {
    console.log(Callback === this.callBack, "Callback === this.callBack");
    return () => {
      const container = document.getElementById(this.containerId);
      if (container) {
        const { clientHeight, scrollTop, scrollHeight } = container;
        if (clientHeight + scrollTop >= scrollHeight) {
          console.log("触底");
          if (Callback) {
            this.initCallBack(Callback);
            Callback();
          }
        }
      }
    };
  }
  // 移除触底函数
  removeHitBottom() {
    const container = document.getElementById(this.containerId);
    this.markFn && container?.removeEventListener("scroll", this.markFn);
  }
  // 添加触底函数
  addHitBottom() {
    const container = document.getElementById(this.containerId);
    this.markFn = this.hitBottom(this.callBack);
    container?.addEventListener("scroll", this.markFn);
  }
  // 判断容器是否在滚动状态
  isScroll() {
    const containerId = document.getElementById(this.containerId);
    if (containerId) {
      const { clientHeight, scrollHeight } = containerId;
      return clientHeight !== scrollHeight;
    }
    return false;
  }
}
