// 仓库文件
import { defineStore } from "pinia";

// 第二个参数支持两种风格：options api 以及 composition api
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      num: 0,
    };
  },
  getters: {
    // 针对上面 state 的数据做一个二次计算
    // 可以看作是计算属性
    doubleCount: (state) => state.num * 2,
  },
  actions: {
    // 同步方法
    increment() {
      this.num++;
    },
    decrement() {
      this.num--;
    },
    // 异步方法
    async asyncIncrement() {
      // 等待 1 秒钟
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.increment();
    },
    async asyncDecrement() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.decrement();
    },
  },
});
