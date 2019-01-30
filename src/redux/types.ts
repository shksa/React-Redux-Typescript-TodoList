
export interface TodoItem extends Readonly<{
  id: string
  text: string
  completed: boolean
}> {}

export enum Filter {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
}

export interface TodoList extends ReadonlyArray<TodoItem> {}

export interface AppState extends Readonly<{
  todoList: TodoList
  filter: Filter
}> {}
