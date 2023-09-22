import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";

export const getTypeList = createAsyncThunk("type/getTypeList", async () => {
  const response = await getType();
  // 填充返回的数据到状态仓库
  return response.data;
});

const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [], // 存储所有的类型
    issueTypeId : 'all',
    bookTypeId : 'all'
  },
  reducers: {
    updateIssueTypeId: (state,{payload})=>{
      state.issueTypeId = payload
    }
  },
  // 专门处理异步的 reducer
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, {payload}) => {
        state.typeList = payload;
    });
  },
});

export const {updateIssueTypeId} = typeSlice.actions;
export default typeSlice.reducer;
