import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUser } from "../api/user"

export const updateUserInfoAsync = createAsyncThunk(
  "user/updateUserInfoAsync",
  async (payload, thunkApi) => {
    console.log(payload,'payload~~');
    await editUser(payload.userId, payload.newInfo);
    thunkApi.dispatch(updateUserInfo(payload.newInfo));
  }
);


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
    },
    // 更新用户信息
    updateUserInfo: (state, { payload }) => {
      for(let key in payload){
        state.userInfo[key] = payload[key];
      }
    }
  },
});

export const { initUserInfo,changeLoginStatus, clearUserInfo, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
