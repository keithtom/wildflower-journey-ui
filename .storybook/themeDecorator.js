import React from "react"
import { GlobalStyle, theme } from "../styles/theme"
import { ThemeProvider } from "styled-components"

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
)

export default ThemeDecorator