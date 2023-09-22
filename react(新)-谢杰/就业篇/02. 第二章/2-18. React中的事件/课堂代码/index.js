import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.js";
import { addEvent } from "./myEvent";

const jsx = (
  <div bindCLICK={(e) => console.log("click div")}>
    <h3>你好</h3>
    <button
      bindCLICK={(e) => {
        e.stopPropagation();
        console.log("click button");
      }}
    >
      点击
    </button>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsx);
// 进行根元素的事件绑定，换句话说，就是使用我们自己的事件系统
addEvent(document.getElementById("root"), "click");
