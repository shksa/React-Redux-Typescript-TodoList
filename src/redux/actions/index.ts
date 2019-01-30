import { Filter } from '../types';

export interface AddTodoAction extends Readonly<{
  id: string
  text: string
  type: 'ADD_TODO'
}> {}

export interface ToggleTodoAction extends Readonly<{
  id: string
  type: 'TOGGLE_TODO'
}> {}

export interface ChangeFilterAction extends Readonly<{
  visibilityFilter: Filter
  type: 'CHANGE_VISIBITY_FILTER'
}> {}

export interface UnknownAction extends Readonly<{
  type: 'UNKNOWN_ACTION',
  dontCare: string
}> {}

export type Action = AddTodoAction | ToggleTodoAction | ChangeFilterAction | UnknownAction

export const ADD_TODO = (id: string, text: string): AddTodoAction => ({
  id,
  text,
  type: 'ADD_TODO'
})

export const TOGGLE_TODO = (id: string): ToggleTodoAction => ({
  id,
  type: 'TOGGLE_TODO'
})

export const CHANGE_FILTER = (visibilityFilter: Filter): ChangeFilterAction => ({
  visibilityFilter,
  type: 'CHANGE_VISIBITY_FILTER'
})