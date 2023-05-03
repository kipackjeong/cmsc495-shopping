import { createTheme } from "@mui/material/styles";
import { palette } from "./colors";

export const theme = createTheme({
  palette: palette,
  status: {
    danger: "#e53e3e",
  },
});
