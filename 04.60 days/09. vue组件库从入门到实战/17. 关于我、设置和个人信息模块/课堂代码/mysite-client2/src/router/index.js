import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";

if (!window.VueRouter) {
  Vue.use(VueRouter); // 使用一个vue插件
}

const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  // 配置
  routes, // 路由匹配规则
  mode: "history",
});

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});

export default router;
