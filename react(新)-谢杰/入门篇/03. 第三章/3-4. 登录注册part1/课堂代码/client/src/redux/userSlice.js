import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        isLogin : false,
        userInfo : {},
    },
    reducers : {
        initUserInfo : (state, {payload})=>{
            state.userInfo = payload;
        }
    }
});

// const { initUserInfo } = userSlice.actions;
export default userSlice.reducer;