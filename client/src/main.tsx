import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { useAppSelector } from "./app/hooks.ts";
import { dark, light } from "./theme";

const Root = () => {
  const { mode } = useAppSelector((store) => store.theme);

  return (
    <ThemeProvider
      theme={mode === "light" ? createTheme(light) : createTheme(dark)}
    >
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <SnackbarProvider />
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>
  </>
);
