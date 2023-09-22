import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUser } from "../api/user";

/**
 * 异步 thunk，外部在进行 dispatch 的时候，直接 dispatch 这个函数
 */
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (payload, action) => {
    // 发送 ajax 请求更新服务器数据
    await editUser(payload.userId, payload.newInfo);
    // 直接在这里派发 action，更新仓库数据
    // 注意下面需要到处对应的 action
    action.dispatch(updateStoreUserInfo(payload.newInfo));
  }
);


/**
 * 创建切片
 */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: [],
  },
  reducers: {
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    updateStoreUserInfo: (state, { payload }) => {
      for (let key in payload) {
        state.userInfo[key] = payload[key];
      }
    },
    clearUserInfo:(state,{payload}) => {
      state.userInfo = [];
    }
  },
});

export const { changeLoginStatus, initUserInfo, updateStoreUserInfo ,clearUserInfo} =
  userSlice.actions;
export default userSlice.reducer;
