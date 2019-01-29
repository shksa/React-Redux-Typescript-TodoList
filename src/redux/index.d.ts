export interface TodoItem {
  id: string
  text: string,
  completed: boolean
}

export enum VisiblityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
}

export type AppState = Readonly<{
  todos: ReadonlyArray<TodoItem>,
  visibiltyFilter: VisiblityFilters
}>