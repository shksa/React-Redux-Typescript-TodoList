import { TodoItem, VisiblityFilters } from "../pages/ToDoList";

export type AddTodoAction = {
  id: string,
  text: string,
  type: 'ADD_TODO'
}

export type ToggleTodoAction = {
  id: string,
  type: 'TOGGLE_TODO'
}

export type ChangeVisibilityFilterAction = {
  visibilityFilter: VisiblityFilters,
  type: 'CHANGE_VISIBITY_FILTER'
}

export type UnknownAction = {
  type: 'UNKNOWN_ACTION',
  dontCare: string
}

export type Action = AddTodoAction | ToggleTodoAction | ChangeVisibilityFilterAction | UnknownAction

export const ADD_TODO = (id: string, text: string): AddTodoAction => ({
  id,
  text,
  type: 'ADD_TODO'
})

export const TOGGLE_TODO = (id: string): ToggleTodoAction => ({
  id,
  type: 'TOGGLE_TODO'
})

export const CHANGE_VISIBILITY_FILTER = (visibilityFilter: VisiblityFilters): ChangeVisibilityFilterAction => ({
  visibilityFilter,
  type: 'CHANGE_VISIBITY_FILTER'
})
