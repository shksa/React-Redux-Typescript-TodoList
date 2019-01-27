import React, { Component } from 'react'
import {ThemeProvider, css} from './styled-components'
import * as s from './AppStyle'
import ToDoList from './pages/ToDoList';


export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={s.theme}>
        <>
          <s.GlobalStyle />
          <ToDoList />
        </>
      </ThemeProvider>
    )
  }
}
