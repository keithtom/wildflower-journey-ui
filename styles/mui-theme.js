import { createTheme } from '@mui/material/styles';

// Style values:
const buffer = 4;
const timing = '.25s';
const easing = 'ease-in-out';
const stroke = '#E1E1E2';
const strokeDarkened = '#adadc5';
const strokeLightened = '#E9EEEE';
const strokeWidth = 1;

export const muiTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
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
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
  },
  util: {
    buffer,
    radius: 4,
    radiusMedium: 8,
    radiusLarge: 16,
    timing,
    transition: `all ${timing} ${easing}`,
    borderWidth: strokeWidth,
    border: `${strokeWidth}px solid ${stroke}`,
    borderLight: `${strokeWidth}px solid ${strokeLightened}`,
    shadow: 'rgba(0,0,0,.05) 0 0px 16px 0px',
    maxFormWidth: 640,
    zIndexBottom: 1,
    zIndexMiddle: 2,
    zIndexTop: 3,
    navWidth: 320
  },
  color: {
    neutral: {
      white: '#FFFFFF',
      light: '#F1F1F3',
      medium: '#E1E1E2',
      dark: '#CACACE',
    },
    text: {
      dark: '#11111A',
      lightened: '#88888C',
      light: '#FFFFFF',
    },
    primary: {
      yellow: {
        main: 'rgba(243, 182, 19, 1)',
        lightened: 'rgba(243, 182, 19, .12)',
        medium: 'rgba(243, 182, 19, .24)'
      },
      purple: {
        main: 'rgba(177, 113, 226, 1)',
        lightened: 'rgba(177, 113, 226, .12)',
        medium: 'rgba(177, 113, 226, .24)'
      },
      green: {
        main: 'rgba(84, 165, 158, 1)',
        lightened: 'rgba(84, 165, 158, .12)',
        medium: 'rgba(84, 165, 158, .24)'
      },
      orange: {
        main: 'rgba(248, 164, 110, 1)',
        lightened: 'rgba(248, 164, 110, .12)',
        medium: 'rgba(248, 164, 110, .24)'
      },
    },
    alert: {
      main: '#FF4D57'
    },
    // TREATMENTS
    opacity: {
      light: '.25',
      medium: '.50',
      dark: '.75'
    }
  },
});