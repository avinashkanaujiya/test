import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import focusSlice from "./focusSlice";
import commonSlice from "./commonSlice";
import navSlice from "./navSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    focus: focusSlice,
    common: commonSlice,
    nav: navSlice,
  },
});
