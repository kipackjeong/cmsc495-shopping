import { PaletteOptions } from "@mui/material";
import { ColorPartial } from "@mui/material/styles/createPalette";

export const palette: PaletteOptions = {
  dark: { main: "#1C1C1C" },
  grey: {
    600: "#505050",
    500: "#8B96A5",
    400: "#BDC4CD",
    300: "#DEE2E7",
    200: "#EFF2F4",
    100: "#F7FAFC",
  },
  blue: {
    100: "#E3F0FF",
  },
  green: { main: "#067D62" },
  apricot: { main: "#FFE6BF" },
  orange: { main: "#FF9017" },
  red: { main: "#FA3434" },

  primary: {
    main: "#0D6EFD",
  },
};

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    dark: PaletteOptions["primary"];
    grey: PaletteOptions["grey"];
    blue: PaletteOptions["blue"];
    green: PaletteOptions["green"];
    apricot: PaletteOptions["primary"];
    orange: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}
