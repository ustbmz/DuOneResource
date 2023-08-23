import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 路由
import router from "@/router";

import { createPinia } from "pinia";
// 引入自定义插件
import {
  myPiniaPlugin1,
  myPiniaPlugin2,
  myPiniaPlugin3,
  myPiniaPlugin4,
} from "./plugins";
// 引入第三方插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia();

// 通过 pinia 实例来注册插件
pinia.use(myPiniaPlugin1);
pinia.use(myPiniaPlugin2);
pinia.use(myPiniaPlugin3);
pinia.use(myPiniaPlugin4);
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount("#app");
