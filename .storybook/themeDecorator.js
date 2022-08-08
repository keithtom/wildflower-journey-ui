import React from "react";
import { theme } from "../styles/theme";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const ThemeDecorator = (storyFn) => {
  return (
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
    </MUIThemeProvider>
  );
};

export default ThemeDecorator;
