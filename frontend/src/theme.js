import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2"
        },
        background: {
            default: "#f7f8fa"
        }
    },

    typography: {
        fontFamily:
            "Inter, Arial, sans-serif"
    },

    shape: {
        borderRadius: 12
    }
});

export default theme;