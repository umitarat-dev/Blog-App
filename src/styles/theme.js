import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#000000" : "#ffffff",
        paper: mode === "dark" ? "#16181c" : "#ffffff",
      },
      divider: mode === "dark" ? "#2f3336" : "#e0e0e0",
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
    },
  });

export default getTheme;