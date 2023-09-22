import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import zhCN from "antd/es/locale/zh_CN"; // 中文语言包
import "antd/dist/antd.min.css"; // antd 整体样式
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
