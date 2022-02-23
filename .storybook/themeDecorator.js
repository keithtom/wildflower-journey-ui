import React from "react"
import { muiTheme } from '../styles/mui-theme'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react'
import { ModalProvider } from 'styled-react-modal'
import { DialogBackground } from '../components/ui/Dialog'

const ThemeDecorator = storyFn => {
  return ( 
  <MUIThemeProvider theme={muiTheme}>
    <ThemeProvider theme={muiTheme}>
      <ModalProvider backgroundComponent={DialogBackground}>
        {storyFn()}
      </ModalProvider>
    </ThemeProvider>
  </MUIThemeProvider>
)}

export default ThemeDecorator
