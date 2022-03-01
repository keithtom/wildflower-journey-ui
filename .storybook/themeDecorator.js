import React from "react"
import { theme } from '../styles/theme'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react'
import { ModalProvider } from 'styled-react-modal'
import { DialogBackground } from '../components/ui/Dialog'

const ThemeDecorator = storyFn => {
  return ( 
  <MUIThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <ModalProvider backgroundComponent={DialogBackground}>
        {storyFn()}
      </ModalProvider>
    </ThemeProvider>
  </MUIThemeProvider>
)}

export default ThemeDecorator
