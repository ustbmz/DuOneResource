import { createSlice } from "@reduxjs/toolkit";

export const todolistSlice = createSlice({
  // 切片的命名空间
  name: "todolist",
  // 初始化仓库数据
  initialState: {
    list: [
      {
        content: "学习 React",
        status: false,
      },
      {
        content: "复习 Vue",
        status: false,
      },
      {
        content: "玩游戏",
        status: false,
      },
      {
        content: "听歌",
        status: false,
      },
    ],
  },
  // reducers
  reducers: {
    /**
     * 
     * @param {*} state 上一次的仓库数据
     * @param {*} param1 传递过来的数据
     */
    add: (state, { payload }) => {
        // 允许你的直接修改 state
        // 如果你去阅读 redux-toolkit 的源码
        // 你会发现底层使用到了 immer.js 这个库
        state.list.push({
            content: payload,
            status: false,
        })
    },
    del: (state, { payload }) => {
        state.list.splice(payload, 1);
    },
    change: (state, { payload }) => {
        state.list[payload].status = !state.list[payload].status;
    },
  },
});

export const {add,del,change} = todolistSlice.actions;

export default todolistSlice.reducer;