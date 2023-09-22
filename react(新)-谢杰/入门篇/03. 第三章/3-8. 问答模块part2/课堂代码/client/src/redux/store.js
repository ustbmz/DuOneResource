import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import typeReducer from "./typeSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    type: typeReducer
  },
});
