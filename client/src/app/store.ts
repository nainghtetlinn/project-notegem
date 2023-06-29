import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import themeReducer from "./features/themeSlice";
import noteReducer from "./features/noteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    note: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
