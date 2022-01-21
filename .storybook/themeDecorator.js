import React from "react"
import { GlobalStyle, theme } from "../styles/theme"
import { ThemeProvider } from "styled-components"
import { ModalProvider } from 'styled-react-modal'
import { DialogBackground } from '../components/ui/Dialog'

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <ModalProvider backgroundComponent={DialogBackground}>
      <GlobalStyle />
      {storyFn()}
    </ModalProvider>
  </ThemeProvider>
)

export default ThemeDecorator
