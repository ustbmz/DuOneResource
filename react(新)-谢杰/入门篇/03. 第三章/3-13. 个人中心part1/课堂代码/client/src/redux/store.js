import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import typeReducer from "./typeSlice";
import interviewReducer from "./interviewSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    type: typeReducer,
    interview : interviewReducer
  },
});
