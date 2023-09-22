// 仓库文件

// 常见仓库

import { createStore } from "redux";

// 引入 reducer

import { todoReducer } from "./reducers"


// 需要你传入一个 reducer（纯函数，用于计算最新的状态）
export const store = createStore(
    todoReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
