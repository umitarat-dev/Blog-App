import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
        h5: {
            fontFamily: "Girassol",
        },
    },
});

export default theme;