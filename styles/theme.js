import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";

// Style values:
const buffer = 4;
const timing = ".25s";
const easing = "ease-in-out";
const borderColor = "#EAEAEA";
const borderWidth = "1px";

export const theme = createTheme({
  util: {
    buffer,
    borderWidth: borderWidth,
    drawerWidth: 280,
    appBarHeight: 64,
    infoDrawerWidth: 520,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 20,
    full: 100,
  },
  color: {
    text: {
      light: "#FFFFFF",
      lightened: "#B2B2B2",
      main: "#1A1A1A",
    },
    primary: {
      lightest: "#E0F4F3",
      lightened: "#7AD1CC",
      main: "#00A69C",
      darkened: "#007E77",
      dark: "#005651",
    },
    neutral: {
      lightest: "#FFFFFF",
      lightened: "#F7F7F7",
      main: "#EAEAEA",
      darkened: "#B2B2B2",
      dark: "#1A1A1A",
    },
    error: {
      lightest: "#FDE7DC",
      light: "#FACAB0",
      medium: "#F26C23",
      dark: "#7E3812",
    },
    warning: {
      lightest: "#FEF8DF",
      light: "#FCF0B7",
      medium: "#F7D538",
      dark: "#806F1D",
    },
    success: {
      lightest: "#F4F9E4",
      light: "#E7F1C3",
      medium: "#BBD758",
      dark: "#61702E",
    },
    transparent: {
      light: "rgba(0, 0, 0, 0.04)",
      main: "rgba(0, 0, 0, 0.08)",
      dark: "rgba(0, 0, 0, 0.16)",
    },
    highlights: {
      brown: "#EEE0DA",
      red: "#FADEC9",
      yellow: "#FDECC8",
      green: "#DBEDDB",
      blue: "#D3E5EF",
      purple: "#E8DEEE",
      pink: "#F0E1E9",
      gray: "#F0ECE1",
    },
  },
  shadow: {
    small: {
      lightened: "0px 4px 8px rgba(0, 0, 0, 0.08)",
      main: "0px 4px 8px rgba(0, 0, 0, 0.16)",
      darkened: "0px 4px 8px rgba(0, 0, 0, 0.24)",
    },
    medium: {
      lightened: "0px 8px 16px rgba(0, 0, 0, 0.08)",
      main: "0px 8px 16px rgba(0, 0, 0, 0.16)",
      darkened: "0px 8px 16px rgba(0, 0, 0, 0.24)",
    },
    large: {
      lightened: "0px 12px 24px rgba(0, 0, 0, 0.08)",
      main: "0px 12px 24px rgba(0, 0, 0, 0.16)",
      darkened: "0px 12px 24px rgba(0, 0, 0, 0.24)",
    },
  },
  typography: {
    h1: {
      fontSize: "48px",
      lineHeight: "60px",
    },
    h2: {
      fontSize: "36px",
      lineHeight: "48px",
    },
    h3: {
      fontSize: "24px",
      lineHeight: "32px",
    },
    h4: {
      fontSize: "20px",
      lineHeight: "24px",
    },
    bodyLarge: {
      fontSize: "18px",
      lineHeight: "22px",
    },
    bodyRegular: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    bodySmall: {
      fontSize: "12px",
      lineHeight: "16px",
    },
    bodyMini: {
      fontSize: "10px",
      lineHeight: "12px",
    },
    weight: {
      main: "400",
      bold: "500",
    },
    family: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif",
  },

  palette: {
    primary: {
      light: "#7AD1CC",
      main: "#00A69C",
      dark: "#007E77",
    },
    secondary: {
      light: "#FEF6E3",
      main: "#F3B613",
      dark: "#D6A00F",
    },
    neutral: {
      light: "#FAFAFA",
      main: "#E1E1E2",
      dark: "#CACACE",
    },
    border: {
      main: borderColor,
    },
    text: {
      light: "#FFFFFF",
      lightened: "#88888C",
      main: "#11111A",
    },
  },

  spacing: buffer,
  breakpoints: {
    values: {
      xs: 640,
      sm: 768,
      md: 1024,
      lg: 1440,
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          bodyLarge: "p",
          bodyRegular: "p",
          bodySmall: "p",
          bodyMini: "p",
          //Old, remove over time
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
          caption: "span",
        },
        h5: undefined,
        h6: undefined,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          margin: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: false,
        disableRipple: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          border: `${borderWidth} solid ${borderColor}`,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "#f1f1f3",
          },
        },
      },
    },
  },
});
