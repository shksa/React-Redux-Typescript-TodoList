import React, {Component} from "react";
import { BrowserRouter as Router, Route, Redirect, RouteComponentProps } from "react-router-dom";
import {ThemeProvider, css} from '../../styled-components'
import * as s from './style'
import ToDoListPage, {VisiblityFilters, VisibiltyFilterToPathMap} from '../ToDoList';


export interface PathParams {
  filter: VisiblityFilters
}

const SetOfPathsWithValidFilterValues = new Set(Object.values(VisibiltyFilterToPathMap))

const RoutedApp = (props: RouteComponentProps) => {
  const pathName = props.location.pathname
  if (SetOfPathsWithValidFilterValues.has(pathName)) {
    return <Route path='/:filter' component={ToDoListPage} />
  }
  return <Redirect to='/SHOW_ALL' />
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={s.theme}>
          <>
            <s.GlobalStyle />
            <Route component={RoutedApp} />
          </>
        </ThemeProvider>
      </Router>
    )
  }
}

/*
Route Rendering Props
You have three prop choices for how you render a component for a given <Route>: `component`, `render`, and `children`. 
1.`component` should be used when you have an existing component (either a React.Component or a stateless functional component) 
  that you want to render. 
2.`render`, which takes an inline function, should only be used when you have to pass in-scope variables to the 
  component you want to render. 
3.```You should not use the component prop with an inline function to pass in-scope variables because you will get 
  undesired component unmounts/remounts```.
*/