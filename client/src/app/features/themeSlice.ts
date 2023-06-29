import { createSlice } from "@reduxjs/toolkit";

interface IThemeState {
  mode: "light" | "dark";
}

const loadMode: () => "dark" | "light" = () => {
  const mode = localStorage.getItem("theme");
  if (mode && (mode === "light" || mode === "dark")) {
    return mode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialThemeState: IThemeState = {
  mode: loadMode(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleMode: (state) => {
      const mode = state.mode === "light" ? "dark" : "light";
      state.mode = mode;
      localStorage.theme = mode;
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
