import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import * as s from './style'
import { PathParams } from '../App';
import uuidv1 from 'uuid/v1'
export interface Props extends RouteComponentProps<PathParams> {} 

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

export const VisibiltyFilterToPathMap: Readonly<{[key in VisiblityFilters]: string}> = {
  SHOW_ALL: `/${VisiblityFilters.SHOW_ALL}`,
  SHOW_ACTIVE: `/${VisiblityFilters.SHOW_ACTIVE}`,
  SHOW_COMPLETED: `/${VisiblityFilters.SHOW_COMPLETED}`
}

export type State = {
  todos: ReadonlyArray<TodoItem>,
  visibiltyFilter: VisiblityFilters
}
 
class ToDoListPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    const {match} = props
    const {params} = match
    this.state = {todos: [], visibiltyFilter: params.filter}
  }

  userInputEle!: HTMLInputElement

  handleUserInputFieldOnKeyUp = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = evt.key
    if (keyPressed !== 'Enter') {
      return
    }
    const newTodoText = this.userInputEle.value
    this.validateAndAddToDo(newTodoText)
  }

  isUserInputValid = (newTodoText: string) => {
    if (newTodoText === "") {
      return false
    }
    return true
  }

  handleAddToDoButtonOnClick = () => {
    const newTodoText = this.userInputEle.value
    this.validateAndAddToDo(newTodoText)
  }

  validateAndAddToDo = (newTodoText: string) => {
    const isValid = this.isUserInputValid(newTodoText)
    if (!isValid) {
      alert("empty item!")
      return
    }
    this.addNewToDoItemToState(newTodoText)
    this.resetInputField()
    this.goToActiveTodoPathIfCurrentlyInCompletedPath()
  }

  goToActiveTodoPathIfCurrentlyInCompletedPath = () => {
    if (this.state.visibiltyFilter === VisiblityFilters.SHOW_COMPLETED) {
      this.props.history.push(VisibiltyFilterToPathMap.SHOW_ACTIVE)
    }
  }

  resetInputField = () => {
    this.userInputEle.value = ""
    this.userInputEle.autofocus = true
  }

  addNewToDoItemToState = (newTodoText: string) => {
    const newTodoItem: TodoItem = {id: uuidv1(),text: newTodoText, completed: false}
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodoItem],
    }))
  }

  toggleToDo = (id: string) => {
    this.setState((prevState) => {
      const newTodos = prevState.todos.map(todoItem => {
        if (todoItem.id === id) {
          return {...todoItem, completed: !todoItem.completed}
        }
        return todoItem
      })
      return {
        todos: newTodos
      }
    })
  }

  getVisibleTodos = (state: State, filter: VisiblityFilters) => {
    const {todos} = state
    if (filter === VisiblityFilters.SHOW_ALL) {
      return todos
    }
    const visibleTodos = todos.filter((todo) => {
      if (filter === VisiblityFilters.SHOW_ACTIVE) {
        return todo.completed === false
      }
      return todo.completed === true
    })
    return visibleTodos
  }

  static getDerivedStateFromProps: React.GetDerivedStateFromProps<Props, State> = (nextProps, prevState) => {
    const {match} = nextProps
    const {params} = match
    const {filter} = params
    //check for url-path/filter change
    if (prevState.visibiltyFilter !== filter) {
      return {
        visibiltyFilter: filter,
      }
    }
    return null
  }

  render() { 
    const visibleTodos = this.getVisibleTodos(this.state, this.state.visibiltyFilter)
    return (
      <s.Page>
        <s.PageContainer>
          <s.Header>To-Do List</s.Header>
          <s.InlineContainer>
            <s.UserInputField 
              ref={(node) => {this.userInputEle = node as HTMLInputElement}}
              autoFocus placeholder='write todo...' 
              onKeyUp={this.handleUserInputFieldOnKeyUp}
            />
            <s.AddTodoButton onClick={this.handleAddToDoButtonOnClick}>Add ToDo</s.AddTodoButton>
          </s.InlineContainer>
          <s.ListContainer>
            <s.ToDoItemsList>
              {visibleTodos.map((toDoItem) => <s.InlineContainer key={toDoItem.id}>
                <s.ToDoItem 
                  onClick={() => {this.toggleToDo(toDoItem.id)}}
                  completed={toDoItem.completed}
                >
                {toDoItem.text}
                </s.ToDoItem>
              </s.InlineContainer>)}
            </s.ToDoItemsList>
          </s.ListContainer>
          <s.Footer>
            <s.RouteLink activeStyle={s.ActiveLinkStyle} to={VisibiltyFilterToPathMap.SHOW_ALL}>All</s.RouteLink>
            <s.RouteLink activeStyle={s.ActiveLinkStyle} to={VisibiltyFilterToPathMap.SHOW_ACTIVE}>Active</s.RouteLink>
            <s.RouteLink activeStyle={s.ActiveLinkStyle} to={VisibiltyFilterToPathMap.SHOW_COMPLETED}>Completed</s.RouteLink>
          </s.Footer>
        </s.PageContainer>
      </s.Page>
    )
  }
}

export default ToDoListPage