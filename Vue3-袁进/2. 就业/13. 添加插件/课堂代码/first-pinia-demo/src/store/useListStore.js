import { defineStore } from "pinia";
import { reactive, computed } from "vue";

// 引入其他仓库
import { useCounterStore } from "./useCounterStore.js";

export const useListStore = defineStore("list", () => {
  const counterStore = useCounterStore();
  // 组合 api 风格

  // 创建仓库数据，类似于 state
  const list = reactive({
    items: [
      {
        text: "学习 Pinia",
        isCompleted: true,
      },
      {
        text: "打羽毛球",
        isCompleted: false,
      },
      {
        text: "玩游戏",
        isCompleted: true,
      },
    ],
    counter: 100,
  });

  // 使用 vue 里面的计算属性来做 getters
  const doubleCounter = computed(() => {
    return list.counter * 2;
  });
  // 接下来我们再来创建一个 getter，该 getter 使用的是其他仓库的数据
  const otherCounter = computed(() => {
    return counterStore.doubleCount * 3;
  });

  // 添加新的事项
  function addItem(newItem) {
    list.items.push({
      text: newItem,
      isCompleted: false,
    });
  }

  // 切换事项对应的完成状态
  function completeHandle(index) {
    list.items[index].isCompleted = !list.items[index].isCompleted;
  }

  // 删除待办事项对应下标的某一项
  function deleteItem(index) {
    list.items.splice(index, 1);
  }

  return {
    list,
    doubleCounter,
    otherCounter,
    addItem,
    completeHandle,
    deleteItem,
  };
},{
  persist: true,
},);
