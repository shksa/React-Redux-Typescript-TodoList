import * as reducers from './reducers'
import {combineReducers} from 'redux'
import { State } from '../pages/ToDoList';
import { Action } from './actions';

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

export const AppReducer = combineReducers<Readonly<State>, Readonly<Action>>({
  todos: reducers.TodoListReducer,
  visibiltyFilter: reducers.VisibilityFilterReducer
})