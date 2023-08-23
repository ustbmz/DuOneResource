# Pinia快速入门

> 面试题：是否使用过 Pinia？简单谈一下 Pinia 的使用？



## 安装 Pinia

首先第一步，需要安装 Pinia，可以通过下面的命令进行安装：

```js
npm install pinia
```

安装完毕后，需要在 Vue 应用中挂载 Pinia

```js
import { createPinia } from "pinia";
// 创建 pinia 实例
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
```

在 src 目录下面创建仓库目录 store，在该目录下面创建对应的仓库文件，注意名字一般是 useXXXStore

在仓库文件中，我们可以通过 defineStore 来创建一个 pinia 仓库，如下：

```js
// 仓库文件
import { defineStore } from "pinia";

// 第二个参数支持两种风格：options api 以及 composition api
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      num: 0,
    };
  },
});
```

创建的时候支持两种风格，选项式 API 以及组合式 API。



## 选项式风格

该风格基本上和之前的 Vuex 是非常相似的，只不过没有 mutation 了，无论是同步的方法还是异步的方法，都写在 actions 里面。

```js
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

```

在组件中使用仓库数据时，首先引入仓库方法，并执行该方法：

```js
import { useCounterStore } from "@/store/useCounterStore.js";
const store = useCounterStore(); // 拿到仓库
```

如果是要获取数据，为了保持数据的响应式，应该使用 storeToRefs 方法。

```js
import { storeToRefs } from "pinia";
// 接下来我们可以从仓库中解构数据出来
const { num, doubleCount } = storeToRefs(store);
```

如果是获取方法，直接从 store 里面解构出来即可。

```js
// 从仓库将方法解构出来
const { increment, asyncIncrement, asyncDecrement } = store;
```



另外，仓库还提供了两个好用的 api：

- store.$reset ：重置 state
- store.$patch：变更 state



## 真题解答

> 题目：是否使用过 Pinia？简单谈一下 Pinia 的使用？
> 参考答案：