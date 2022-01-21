import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '../styles/theme'
import { ModalProvider } from 'styled-react-modal'
import { DialogBackground } from '../components/ui/Dialog'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider backgroundComponent={DialogBackground}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ModalProvider>
    </ThemeProvider>
  )
}

export default MyApp
