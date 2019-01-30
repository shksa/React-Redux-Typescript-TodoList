import {css} from "@emotion/core"

export const GlobalCSS = css`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  * {
    position: relative;
    box-sizing: border-box;
  }
`;

export const theme = {
  primaryColor: 'white',
  primaryColorInverted: 'black',
  background: 'beige',
  buttonColor1: "red",
  buttonColor2: "brown",
  buttonOnHoverColor1: "blueviolet",
  buttonOnHoverColor2: "blue"
}