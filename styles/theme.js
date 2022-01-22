import { createGlobalStyle } from 'styled-components';

// Style values:
const buffer = 4;
const timing = '.25s';
const easing = 'ease-in-out';
const stroke = '#E1E1E2';
const strokeDarkened = '#adadc5';
const strokeLightened = '#E9EEEE';
const strokeWidth = 1;

export const theme = {
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
    zIndexTop: 3
  },
  breakpoint: {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1440
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
        lightened: 'rgba(243, 182, 19, .25)'
      },
      purple: {
        main: 'rgba(177, 113, 226, 1)',
        lightened: 'rgba(177, 113, 226, .25)'
      },
      green: {
        main: 'rgba(84, 165, 158, 1)',
        lightened: 'rgba(84, 165, 158, .25)'
      },
      orange: {
        main: 'rgba(248, 164, 110, 1)',
        lightened: 'rgba(248, 164, 110, .25)'
      },
    },
    // TREATMENTS
    opacity: {
      light: '.25',
      medium: '.50',
      dark: '.75'
    }
  },
  text: {
    body: {
      mini: {
        size: 10,
        lineHeight: 12
      },
      small: {
        size: 12,
        lineHeight: 16
      },
      regular: {
        size: 14,
        lineHeight: 20
      },
      large: {
        size: 18,
        lineHeight: 22
      }
    },
    title: {
      small: {
        size: 20,
        lineHeight: 24
      },
      regular: {
        size: 24,
        lineHeight: 32
      },
      large: {
        size: 36,
        lineHeight: 48
      },
      headline: {
        size: 48,
        lineHeight: 60
      },
    },
    // TREATMENTS
    weight: {
      semibold: '600',
      medium: '500',
      regular: '400'
    },
    family: 'Inter, Helvetica Neue, Helvetica, Arial, sans-serif'
  }
};

// Global styles:
export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0 !important;
    font-family: ${(props) => props.theme.text.family};
    -webkit-overflow-scrolling: touch;
  }
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${(props) => props.theme.text.body.size}px;
    line-height: ${(props) => props.theme.text.body.lineHeight}px;
    color: ${(props) => props.theme.color.text.main};
    background-color: ${(props) => props.theme.color.neutral.white};
  }
  * {
    box-sizing: border-box;
  }
  input, textarea {
    font-size: ${(props) => props.theme.text.body.size}px;
    font-family: ${(props) => props.theme.text.family};
    color: ${(props) => props.theme.color.text.main};
  }
  textarea {
    line-height: ${(props) => props.theme.text.body.lineHeight}px;
  }
  button: {
    cursor: pointer;
  }
  p, a, li, div, span {
    font-family: ${(props) => props.theme.text.family};
    font-size: ${(props) => props.theme.text.body.size}px;
    font-weight: ${(props) => props.theme.text.weight};
  }
  /* h1,h2,h3,h4,h5,h6,a,p,div,span {} */
  a {
    text-decoration: underline;
    cursor: pointer;
    color: ${(props) => props.theme.color.primary.main};
    font-weight: ${({ theme }) => theme.text.weightHeavy};
    &:hover, &:hover * {
      color: ${({ theme }) => theme.color.primary.darkened};
    }
    /* &:visited {
      color: inherit;
    } */
  }
  ::placeholder {
    color: ${(props) => props.theme.color.text.lightened};
  }


  ul {
    margin: 0;
    padding: 0;
  }

  p {
    line-height: ${(props) => props.theme.text.body.lineHeight}px;
  }

  pre {
    font-family: ${(props) => props.theme.text.family};
  }
  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }
  @page {
    size: auto;
    margin: 20mm;
  }
`;
