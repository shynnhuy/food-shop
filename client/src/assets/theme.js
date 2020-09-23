import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import orange from "@material-ui/core/colors/deepOrange";

import Josefin from "assets/scss/fonts/josefin-sans-v16-vietnamese-regular.woff2";

const josefin = {
  fontFamily: "Josefin Sans",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Josefin'),
    local('Josefin-Regular'),
    url(${Josefin}) format('woff2')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export default createMuiTheme({
  palette: {
    primary: orange,
    secondary: pink,
    lighter: {
      main: pink[50],
    },
  },
  typography: {
    fontFamily: "Josefin Sans",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    htmlFontSize: 16,
  },
  overrides: {
    MuiFormControl: {
      marginNormal: {
        marginTop: "8px",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": [josefin],
        "*::-webkit-scrollbar": {
          width: "0.5em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0, 0.85)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
      },
    },
  },
});
