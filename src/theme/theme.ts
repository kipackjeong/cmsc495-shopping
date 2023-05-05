import { createTheme } from "@mui/material/styles";
import { palette } from "./colors";

export const theme = createTheme({
  palette: palette,
  status: {
    danger: "#e53e3e",
  },
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
