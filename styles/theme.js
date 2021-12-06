import { createGlobalStyle } from 'styled-components';

// Style values:
const buffer = 10;
const timing = '.15s';
const easing = 'ease-in-out';
const stroke = '#CECECE';
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
    shadow: '0 2px 4px -1px #b6bcbd',
    shadowMedium: 'rgb(0,0,0,0.15) 0px 15px 30px 0px',
    shadowLarge: 'rgb(0,0,0,0.15) 0px 50px 100px 0px',
    shadowBlue: 'rgb(27,155,181,0.25) 0px 25px 50px 0px',
    shadowOrange: 'rgb(240,108,58,0.25) 0px 25px 50px 0px',
    borderWidth: strokeWidth,
    border: `${strokeWidth}px solid ${stroke}`,
    borderLight: `${strokeWidth}px solid ${strokeLightened}`,
    maxPageWidth: 1024,
    maxPageWidthWide: 1200,
    maxPageWidthNarrow: 400,
    maxFormWidth: 700,
    headerHeight: 100,
    siderailWidth: 200,
    zIndexHeader: 3,
    zIndexMenu: 2,
    zIndexBanner: 1,
    zIndexPageContainer: 0
  },
  breakpoint: {
    xs: 640,
    sm: 768,
    // md: 1024,
    md: 1200, //this breakpoint is used because the sidebar design is too wide for a 1024 breakpoint. Rethink this design to not require this.
    lg: 1440
  },
  color: {
    light: '#ffffff',
    border: {
      main: stroke,
      darkened: strokeDarkened
    },
    primary: {
      main: '#5245EA',
      lightened: '#F6F5FE',
      darkened: '#0a6a7d'
    },
    secondary: {
      main: '#FEBB39',
      lightened: '#FFDE9E',
      darkened: '#DAAA1C'
    },
    tertiary: {
      main: '#F06C3A',
      darkened: '#DA6336'
    },
    warning: {
      main: '#F4CA4C',
      lightened: '#fff2ca'
    },
    error: {
      main: '#F06C3A',
      darkened: '#DE5B2A',
      lightened: '#F19B7B'
    },
    success: {
      main: '#75BB1D',
      lightened: '#c1e496'
    },
    bg: {
      main: '#eee',
      lightened: '#FAFAFA',
      lightest: '#aaa',
      light: '#fff',
      dark: '#D9DCDD',
      darkened: '#E8ECED'
    },
    text: {
      main: '#11111a',
      lightened: '#888888',
      light: '#ffffff'
    },
    input: {
      disabled: '#f9f9f9'
    }
  },
  text: {
    body: {
      sizeSmall: 14,
      size: 16,
      sizeLarge: 22,
      lineHeightSmall: 18,
      lineHeight: 24,
      lineHeightLarge: 32,
      breakpoint: {
        xs: 15,
        md: 16
      }
    },
    h1: {
      size: 52,
      lineHeight: 56
    },
    h2: {
      size: 36,
      lineHeight: 48
    },
    h3: {
      size: 24,
      lineHeight: 36
    },

    // TREATMENTS
    weight: '400',
    weightHeavy: '500',
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
    background-color: ${(props) => props.theme.color.bg.light};
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
