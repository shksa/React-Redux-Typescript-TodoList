import * as reducers from './reducers'
import {combineReducers} from 'redux'
import { Action } from './actions';
import { AppState } from './index.d'

// /**
//  * AppReducer manages the state of the whole app. It delegates the management of different parts of the state tree to different reducers.
//  * It uses other reducers in order to produce the new app state.
//  * @param prevState The entire app's state
//  * @param action 
//  */
// export const AppReducer = (prevState: Readonly<State> = defaultState, action: Readonly<Action>): State => {
//   return {
//     todos: TodoListReducer(prevState.todos, action),
//     visibiltyFilter: VisibilityFilterReducer(prevState.visibiltyFilter, action)
//   }
// }

/*
const combineReducers = (statePropertyToReducerMap) => {
  return (state = {}, action) => {
    return Object.entries(statePropertyToReducerMap).reduce((nextState, [stateProperty, reducer]) => {
      nextState[stateProperty] = reducer(state[stateProperty], action)
      return nextState
    }, {})
  }
}
*/


export const AppReducer = combineReducers<Readonly<AppState>, Readonly<Action>>({
  todos: reducers.TodoListReducer,
  visibiltyFilter: reducers.VisibilityFilterReducer
})