import { State, VisiblityFilters, TodoItem } from "../../pages/ToDoList";
import { Action } from "../actions";
import {combineReducers} from 'redux'

const defaultState: State = {todos: [], visibiltyFilter: VisiblityFilters.SHOW_ALL}

/*
Reducer
1. Function that calculates the next state tree based on the previous state tree and the action being dispatched.
2. This function HAS to be PURE.
3. The next state has to be a new object, not a modification of the same previous state object.
4. The reducers may never return undefined for any action. 
5. Instead, they should return their initial state if the state passed to them was undefined, and the current state 
    for any unrecognized action.
*/

/**
 * TodoItemReducer manages all the single todo objects in the app's state tree. This reducer does the job of creating and updating a todo
 * in response to the ADD_TODO, TOGGLE_TODO actions.
 * @param prevState A single todo item
 * @param action Primarily ADD_TODO, TOGGLE_TODO actions, contains a default return for any other action
 */
export const TodoItemReducer = (prevState: Readonly<TodoItem> | undefined, action: Readonly<Action>): TodoItem => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false} // Creating a new todoItem
  
    case 'TOGGLE_TODO':
      prevState = prevState as Readonly<TodoItem>
      if (action.id !== prevState.id) {
        return prevState
      }
      return {...prevState, completed: !prevState.completed} // ...todoItem is great here bcoz we may add new properties to the TodoItem and we may forget to include them here if we wrote properties manually. 
    
    default:
      return (prevState as TodoItem)
  }
}

/**
 * TodoListReducer manages the array of todos in the app's state tree. This reducer does the job of adding a new todo to the list and
 * toggling an existing todo in the list in response to the ADD_TODO, TOGGLE_TODO actions.
 * @param prevState An array of todo items
 * @param action Primarily ADD_TODO, TOGGLE_TODO actions, contains a default return for any other action
 */
export const TodoListReducer = (prevState: ReadonlyArray<TodoItem> = [], action: Readonly<Action>): Array<TodoItem> => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...prevState, TodoItemReducer(undefined, action)]

    case 'TOGGLE_TODO':
      return prevState.map(todoItem => TodoItemReducer(todoItem, action))
  
    default:
      return (prevState as Array<TodoItem>)
  }
}

export const VisibilityFilterReducer = (prevState: VisiblityFilters = VisiblityFilters.SHOW_ALL, action: Readonly<Action>): VisiblityFilters => {
  switch (action.type) {
    case 'CHANGE_VISIBITY_FILTER':
      return action.visibilityFilter
  
    default:
      return prevState
  }
}