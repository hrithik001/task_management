import { configureStore } from "@reduxjs/toolkit";
import displayBoardSlice from "./displayBoardSlice";

const store = configureStore({
  reducer: {
    dashboard: displayBoardSlice.reducer,
  },
});
export default store;
