import { ThemeOptions } from "@mui/material";

export const dark: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#de5002",
    },
    secondary: {
      main: "#bd1c1c",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
};

export const light: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#de5002",
    },
    secondary: {
      main: "#bd1c1c",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
};
