import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {ThemeProvider, css} from '../../styled-components'
import * as s from './style'
import ToDoListPage from '../ToDoList';

export enum FilterValues {
  all = 'all',
  active = 'active',
  completed = 'completed'
}

export interface PathParams {
  filter?: FilterValues
}



export default class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={s.theme}>
          <>
            <s.GlobalStyle />
            <Route path='/:filter?' component={ToDoListPage} />
          </>
        </ThemeProvider>
      </Router>
    )
  }
}
