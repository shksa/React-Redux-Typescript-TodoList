import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import * as s from './style'
// import { PathParams } from '../App';
import uuidv1 from 'uuid/v1'
import {TodoItem, VisiblityFilters, AppState} from '../../redux/index.d'
import {ReduxStore} from '../App'
import * as actions from '../../redux/actions'


export interface Props extends AppState {} 

export const VisibiltyFilterToPathMap: Readonly<{[key in VisiblityFilters]: string}> = {
  SHOW_ALL: `/${VisiblityFilters.SHOW_ALL}`,
  SHOW_ACTIVE: `/${VisiblityFilters.SHOW_ACTIVE}`,
  SHOW_COMPLETED: `/${VisiblityFilters.SHOW_COMPLETED}`
}


 
class ToDoListPage extends Component<Props, {}> {

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
    // this.goToActiveTodoPathIfCurrentlyInCompletedPath()
  }

  // goToActiveTodoPathIfCurrentlyInCompletedPath = () => {
  //   if (this.state.visibiltyFilter === VisiblityFilters.SHOW_COMPLETED) {
  //     this.props.history.push(VisibiltyFilterToPathMap.SHOW_ACTIVE)
  //   }
  // }

  resetInputField = () => {
    this.userInputEle.value = ""
    this.userInputEle.autofocus = true
  }

  addNewToDoItemToState = (newTodoText: string) => {
    const id = uuidv1()
    ReduxStore.dispatch(actions.ADD_TODO(id, newTodoText))
  }

  toggleToDo = (id: string) => {
    ReduxStore.dispatch(actions.TOGGLE_TODO(id))
  }

  getVisibleTodos = (todos: ReadonlyArray<TodoItem>, filter: VisiblityFilters): ReadonlyArray<TodoItem> => {
    switch (filter) {
      case VisiblityFilters.SHOW_ALL:
        return todos
      
      case VisiblityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => {
          return !todo.completed
        })
      
      case VisiblityFilters.SHOW_COMPLETED:
        return todos.filter(todo => {
          return todo.completed
        })
    }
  }

  // static getDerivedStateFromProps: React.GetDerivedStateFromProps<Props, State> = (nextProps, prevState) => {
  //   const {match} = nextProps
  //   const {params} = match
  //   const {filter} = params
  //   //check for url-path/filter change
  //   if (prevState.visibiltyFilter !== filter) {
  //     return {
  //       visibiltyFilter: filter,
  //     }
  //   }
  //   return null
  // }

  showFilteredTodos = (filter: VisiblityFilters) => {
    ReduxStore.dispatch(actions.CHANGE_VISIBILITY_FILTER(filter))
  }

  render() { 
    const {todos, visibiltyFilter} = this.props
    const visibleTodos = this.getVisibleTodos(todos, visibiltyFilter)
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
            <s.FilterLink 
              filter={VisiblityFilters.SHOW_ALL} 
              currentFilter={visibiltyFilter}
              onClick={() => this.showFilteredTodos(VisiblityFilters.SHOW_ALL)}
            >All</s.FilterLink>
            <s.FilterLink 
              filter={VisiblityFilters.SHOW_ACTIVE}
              currentFilter={visibiltyFilter}
              onClick={() => this.showFilteredTodos(VisiblityFilters.SHOW_ACTIVE)}
            >Active</s.FilterLink>
            <s.FilterLink 
              filter={VisiblityFilters.SHOW_COMPLETED}
              currentFilter={visibiltyFilter} 
              onClick={() => this.showFilteredTodos(VisiblityFilters.SHOW_COMPLETED)}
            >Completed</s.FilterLink>
          </s.Footer>
        </s.PageContainer>
      </s.Page>
    )
  }
}

export default ToDoListPage