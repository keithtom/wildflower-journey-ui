import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles';

// Style values:
const buffer = 4;
const timing = '.25s';
const easing = 'ease-in-out';
const stroke = '#E1E1E2';
const strokeDarkened = '#adadc5';
const strokeLightened = '#E9EEEE';
const strokeWidth = 1;

export const theme = createTheme({
  palette: {
    primary: {
      light: '#F6EEFC',
      main: '#B171E2',
      dark: '#803DB5'
    },
    secondary: {
      light: '#FEF6E3',
      main: '#F3B613',
      dark: '#D6A00F'
    },
    neutral: {
      light: '#FAFAFA',
      main: '#E1E1E2',
      dark: 'CACACE'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: { //Title Headline
      fontSize: '48px',
      lineHeight: '60px'
    },
    h2: { //Title Large
      fontSize: '36px',
      lineHeight: '48px'
    },
    h3: { //Title Regular
      fontSize: '24px',
      lineHeight: '32px'
    },
    h4: { //Title Small
      fontSize: '20px',
      lineHeight: '24px'
    },
    h5: { //Body Large
      fontSize: '18px',
      lineHeight: '22px'
    },
    body1: { //Body Regular
      fontSize: '14px',
      lineHeight: '20px'
    },
    body2: { //Body Small
      fontSize: '12px',
      lineHeight: '16px'
    },
    caption: { //Body Mini
      fontSize: '10px',
      lineHeight: '12px'
    },
  },
  spacing: 4,
  breakpoints: {
    values: {
      xs: 640,
      sm: 768,
      md: 1024,
      lg: 1440
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          margin: 0,
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: false,
        disableRipple: true
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          marginTop: '8px',
          border: '1px solid #eaeaea',
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            background: '#f1f1f3'
          }
        }
      }
    }
  },
});
