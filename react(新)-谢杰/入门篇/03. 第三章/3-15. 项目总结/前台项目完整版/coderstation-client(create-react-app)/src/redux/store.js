import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "./typeSlice";
import interviewReducer from "./interviewSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    type: typeReducer,
    interview: interviewReducer,
    user: userReducer,
  },
});
