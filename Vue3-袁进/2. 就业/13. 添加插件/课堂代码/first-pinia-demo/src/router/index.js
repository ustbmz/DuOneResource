import { createRouter, createWebHistory } from "vue-router";

// 引入组件
import Counter from "@/components/Counter.vue";
import ToDoList from "@/components/ToDoList.vue";

// 配置路由
const routes = [
  {
    path: "/",
    redirect: "/counter",
    children: [
      {
        path: "counter",
        component: Counter,
      },
      {
        path: "todolist",
        component: ToDoList,
      },
    ],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "exact-active",
  linkActiveClass: "active",
  routes,
});

export default router;
