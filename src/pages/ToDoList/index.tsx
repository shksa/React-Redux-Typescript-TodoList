import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import * as s from './style'
import { PathParams, FilterValues } from '../App';

export interface Props extends RouteComponentProps<PathParams> {} 

interface TodoItem {
  text: string,
  completed: boolean
}
 
type State = {
  todos: Array<TodoItem>,
  visibleTodos: Array<TodoItem>,
  currentFilter: FilterValues | undefined
}

export const AllTodosPath = `/${FilterValues.all}`
export const ActiveTodosPath = `/${FilterValues.active}`
export const CompletedTodosPath = `/${FilterValues.completed}`
 
class ToDoListPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    const {match} = props
    const {params} = match
    this.state = {todos: [], visibleTodos: [], currentFilter: params.filter}
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
    this.goToAllTodoPathIfCurrentlyInCompletedPath()
  }

  goToAllTodoPathIfCurrentlyInCompletedPath = () => {
    if (this.state.currentFilter === FilterValues.completed) {
      this.props.history.push(AllTodosPath)
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

  static getVisibleTodos = (state: State, filter: FilterValues | undefined) => {
    const {todos} = state
    if (filter === undefined || filter === FilterValues.all) {
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
    return (
      <s.Page>
        <s.PageContainer>
          <s.Header>To-Do List</s.Header>
          <s.UserInputField 
            ref={(node) => {this.userInputEle = node as HTMLInputElement}}
            autoFocus placeholder='write todo...' 
            onKeyUp={this.handleUserInputFieldOnKeyUp}
          />
          <s.AddTodoButton onClick={this.handleAddToDoButtonOnClick}>Add ToDo</s.AddTodoButton>
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
          <s.Footer>
            <s.RouteLink to={AllTodosPath}>All</s.RouteLink>
            <s.RouteLink to={ActiveTodosPath}>Active</s.RouteLink>
            <s.RouteLink to={CompletedTodosPath}>Completed</s.RouteLink>
          </s.Footer>
        </s.PageContainer>
      </s.Page>
    )
  }
}

export default ToDoListPage