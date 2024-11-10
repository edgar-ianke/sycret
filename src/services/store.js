import { configureStore } from "@reduxjs/toolkit";
import certificateReducer from "./features/slice";
const store = configureStore({
  reducer: {
    certificates: certificateReducer
  }
})
export default store