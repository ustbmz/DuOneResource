import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    // 初始化用户信息
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    // 修改用户登录状态
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    // 清除用户信息
    clearUserInfo : (state, { payload }) => {
      state.userInfo = {};
    }
  },
});

export const { initUserInfo,changeLoginStatus, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
