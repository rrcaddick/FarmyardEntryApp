import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shiftReducer from "./slices/shiftSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shift: shiftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
