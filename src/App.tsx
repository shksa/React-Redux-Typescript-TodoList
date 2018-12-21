import React, { Component } from 'react'
import {ThemeProvider, css} from './styled-components'
import * as s from './AppStyle'
import Default from './pages/default';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={s.theme}>
        <>
          <s.GlobalStyle />
          <s.AppWrapper>
            <Default />
          </s.AppWrapper>
        </>
      </ThemeProvider>
    )
  }
}
