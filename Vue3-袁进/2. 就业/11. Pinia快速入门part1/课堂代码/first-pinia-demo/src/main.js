import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 路由
import router from "@/router";

import { createPinia } from "pinia";
// 创建 pinia 实例
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
