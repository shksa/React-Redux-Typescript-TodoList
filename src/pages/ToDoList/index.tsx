import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import * as s from './style'
import { PathParams } from '../App';

export interface Props extends RouteComponentProps<PathParams> {} 

interface TodoItem {
  text: string,
  completed: boolean
}

export enum FilterValues {
  all = 'all',
  active = 'active',
  completed = 'completed'
}

export const FilterValuesToPathsMap: {[key in FilterValues]: string} = {
  all: `/${FilterValues.all}`,
  active: `/${FilterValues.active}`,
  completed: `/${FilterValues.completed}`
}
 
type State = {
  todos: Array<TodoItem>,
  visibleTodos: Array<TodoItem>,
  currentFilter: FilterValues
}
 
class ToDoListPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    const {match} = props
    const {params} = match
    this.state = {todos: [], visibleTodos: [], currentFilter: params.filter}
  }

  allTodosPath = FilterValuesToPathsMap.all
  activeTodosPath = FilterValuesToPathsMap.active
  completedTodosPath = FilterValuesToPathsMap.completed

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
    this.goToAllTodoPathIfCurrentlyInCompletedPath()
  }

  goToAllTodoPathIfCurrentlyInCompletedPath = () => {
    if (this.state.currentFilter === FilterValues.completed) {
      this.props.history.push(this.allTodosPath)
    }
  }

  resetInputField = () => {
    this.userInputEle.value = ""
    this.userInputEle.autofocus = true
  }

  addNewToDoItemToState = (newTodoText: string) => {
    const newTodoItem: TodoItem = {text: newTodoText, completed: false}
    this.setState((prevState) => ({
      todos: [...prevState.todos, {...newTodoItem}],
      visibleTodos: [...prevState.visibleTodos, {...newTodoItem}]
    }))
  }

  toggleToDo = (id: number) => {
    this.setState((prevState) => {
      const newTodos = [...prevState.todos]
      const newVisibleTodos = [...prevState.visibleTodos]
      newTodos[id] = {...newTodos[id], completed: !newTodos[id].completed}
      newVisibleTodos[id] = {...newVisibleTodos[id], completed: !newVisibleTodos[id].completed}
      return {
        todos: newTodos, visibleTodos: newVisibleTodos
      }
    })
  }

  static getVisibleTodos = (state: State, filter: FilterValues) => {
    const {todos} = state
    if (filter === FilterValues.all) {
      return todos
    }
    const visibleTodos = todos.filter((todo) => {
      if (filter === FilterValues.active) {
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
    if (prevState.currentFilter !== filter) {
      return {
        currentFilter: params.filter,
        visibleTodos: ToDoListPage.getVisibleTodos(prevState, filter)
      }
    }
    return null
  }

  render() { 
    const {visibleTodos} = this.state
    const {match, location} = this.props
    console.log(match, location)
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
              {visibleTodos.map((toDoItem, idx) => <s.InlineContainer key={idx}>
                <s.ToDoItem 
                  onClick={() => {this.toggleToDo(idx)}}
                  completed={toDoItem.completed}
                >
                {toDoItem.text}
                </s.ToDoItem>
              </s.InlineContainer>)}
            </s.ToDoItemsList>
          </s.ListContainer>
          <s.Footer>
            <s.RouteLink activeStyle={s.ActiveLinkStyle} to={this.allTodosPath}>All</s.RouteLink>
            <s.RouteLink activeStyle={s.ActiveLinkStyle} to={this.activeTodosPath}>Active</s.RouteLink>
            <s.RouteLink activeStyle={s.ActiveLinkStyle} to={this.completedTodosPath}>Completed</s.RouteLink>
          </s.Footer>
        </s.PageContainer>
      </s.Page>
    )
  }
}

export default ToDoListPage