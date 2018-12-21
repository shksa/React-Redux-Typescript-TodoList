import styled, {createGlobalStyle} from './styled-components'
import ThemeInterface from './theme'

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
`;

export const theme: ThemeInterface = {
  primaryColor: "white", 
  primaryColorInverted: "black",
}

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: aliceblue;
`