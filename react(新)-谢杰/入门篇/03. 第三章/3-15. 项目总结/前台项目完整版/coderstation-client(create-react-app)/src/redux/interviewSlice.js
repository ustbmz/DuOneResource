import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInterviewTitle } from "../api/interview";

/**
 * 异步 thunk，外部在进行 dispatch 的时候，直接 dispatch 这个函数
 */
export const getInterviewTitleList = createAsyncThunk(
  "interview/getInterviewTitleList",
  async (_, action) => {
    // 发送 ajax 请求获取数据
    const response = await getInterviewTitle();
    // action.dispatch(initTypeList(response.data));
    return response.data;
  }
);

/**
 * 创建切片
 */
export const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviewTitleList: [],
  },
  reducers:{},
  extraReducers:{
    [getInterviewTitleList.fulfilled]:(state,action)=>{
        state.interviewTitleList = action.payload;
    }
  }
});

// export const { interviewTitleList } = interviewSlice.actions;

export default interviewSlice.reducer;