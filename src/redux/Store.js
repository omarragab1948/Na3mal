import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";

export const Store = configureStore({
  reducer: {
    AuthSlice
  },
});
