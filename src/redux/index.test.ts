import {AppReducer} from './index'
import { State, VisiblityFilters } from '../pages/ToDoList';
import * as actions from './actions';

describe('AppReducer should be pure and return new state from prev state and an action', () => {
  test('AppReducer should return new state with new todo item', () => {
    const prevState: State = {
      todos: [{id: 'a1b2c3', text: 'hello', completed: false}], 
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
    const action = actions.ADD_TODO('q1w3e4', 'world')
    const nextState: State = {
      todos: [{id: 'a1b2c3', text: 'hello', completed: false}, {id: 'q1w3e4', text: 'world', completed: false}],
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
  
    Object.freeze(action)
    Object.freeze(prevState)
  
    expect(AppReducer(prevState, action)).toEqual(nextState)
  })
  
  test('AppReducer should return new state with todo item toggled', () => {
    const id = 'a1b2c3'
    const prevState: State = {
      todos: [{id, text: 'hello', completed: false}], 
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
    const action = actions.TOGGLE_TODO(id)
    const nextState: State = {
      todos: [{id, text: 'hello', completed: true}],
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
  
    Object.freeze(action)
    Object.freeze(prevState)
  
    expect(AppReducer(prevState, action)).toEqual(nextState)
  })

  test('AppReducer should return new state with currentVisibilityFilter changed', () => {
    const prevState: State = {
      todos: [{id: 'a1b2c3', text: 'hello', completed: false}, {id: 'q1w3e4', text: 'world', completed: true}], 
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
    const action = actions.CHANGE_VISIBILITY_FILTER(VisiblityFilters.SHOW_ACTIVE)
    const nextState: State = {
      todos: [{id: 'a1b2c3', text: 'hello', completed: false}, {id: 'q1w3e4', text: 'world', completed: true}],
      visibiltyFilter: VisiblityFilters.SHOW_ACTIVE
    }
  
    Object.freeze(action)
    Object.freeze(prevState)
  
    expect(AppReducer(prevState, action)).toEqual(nextState)
  })

  test('AppReducer should return same state with unknown action', () => {
    const prevState: State = {
      todos: [{id: 'a1b2c3', text: 'hello', completed: false}, {id: 'q1w3e4', text: 'world', completed: true}], 
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
    const action: actions.UnknownAction = {type: 'UNKNOWN_ACTION', dontCare: 'dontCare'}

    Object.freeze(action)
    Object.freeze(prevState)

    expect(AppReducer(prevState, action)).toEqual(prevState)
  })

  test('AppReducer should use default state as prevState when undefined is passed as prevState value in arguments', () => {
    const prevState = undefined
    const action = actions.ADD_TODO('a2d35f', 'hello')
    const nextState: State = {
      todos: [{id: 'a2d35f', text: 'hello', completed: false}],
      visibiltyFilter: VisiblityFilters.SHOW_ALL
    }
    Object.freeze(action)
    Object.freeze(prevState)

    expect(AppReducer(prevState, action)).toEqual(nextState)
  })
})