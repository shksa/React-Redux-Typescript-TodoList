import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import {Global} from "@emotion/core"
import * as s from "./style";
import { createStore } from "redux";
import { AppState } from "../../redux/types";
import { AppReducer } from "../../redux";
import HomePage from "../Home";

export const ReduxStore = createStore(AppReducer);

// export interface PathParams {
//   filter: VisiblityFilters
// }

// const SetOfPathsWithValidFilterValues = new Set(Object.values(VisibiltyFilterToPathMap))

// const RoutedApp = (props: RouteComponentProps) => {
//   const pathName = props.location.pathname
//   if (SetOfPathsWithValidFilterValues.has(pathName)) {
//     return <Route path='/:filter' component={ToDoListPage} />
//   }
//   return <Redirect to='/SHOW_ALL' />
// }

export default function App(props: AppState) {
  return (
    // <Router>
    <ThemeProvider theme={s.theme}>
      <Global styles={s.GlobalCSS} />
      <HomePage {...props} />
      {/* <Route component={RoutedApp} /> */}
    </ThemeProvider>
    // </Router>
  );
}

export const RenderApp = () => {
  ReactDOM.render(
    <App {...ReduxStore.getState()} />,
    document.getElementById("root")
  );
};

ReduxStore.subscribe(RenderApp);

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
