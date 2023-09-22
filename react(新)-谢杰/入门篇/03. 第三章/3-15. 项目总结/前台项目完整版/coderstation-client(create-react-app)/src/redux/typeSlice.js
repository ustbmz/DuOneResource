import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";

/**
 * 异步 thunk，外部在进行 dispatch 的时候，直接 dispatch 这个函数
 */
export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async (_, action) => {
    // 发送 ajax 请求获取数据
    const response = await getType();
    // action.dispatch(initTypeList(response.data));
    return response.data;
  }
);

/**
 * 创建切片
 */
export const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
    issueTypeId: 'all',
    bookTypeId: 'all',
  },
  reducers: {
    updateStoreIssueTypeId: (state, { payload }) => {
      state.issueTypeId = payload;
    },
    updateStoreBookTypeId: (state, { payload }) => {
      state.bookTypeId = payload;
    },
  },
  extraReducers: {
    [getTypeList.fulfilled]: (state, action) => {
      state.typeList = action.payload;
    },
  },
});

export const { updateStoreIssueTypeId,updateStoreBookTypeId } = typeSlice.actions;

export default typeSlice.reducer;
