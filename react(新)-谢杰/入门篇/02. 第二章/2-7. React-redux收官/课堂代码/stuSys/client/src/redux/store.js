import { configureStore } from "@reduxjs/toolkit";
import stuReducer from "./stuSlice";

export default configureStore({
  reducer: {
    stu: stuReducer,
  },
});
