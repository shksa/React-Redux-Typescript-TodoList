import styled, {createGlobalStyle} from './styled-components'
import ThemeInterface from './styled-components/theme'

export const GlobalStyle = createGlobalStyle`
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

export const theme: ThemeInterface = {
  primaryColor: 'white',
  primaryColorInverted: 'black',
  background: 'beige'
}