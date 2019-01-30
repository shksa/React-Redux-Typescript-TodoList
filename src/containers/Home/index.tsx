import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import * as s from "./style";
// import { PathParams } from '../App';
import uuidv1 from "uuid/v1";
import * as t from "../../redux/types";
import { ReduxStore } from "../App";
import * as actions from "../../redux/actions";
import TodoList from "../../components/TodoList";
import * as cs from "../../components/Common";

export interface Props extends t.AppState {}

export const VisibiltyFilterToPathMap: Readonly<
  { [key in t.Filter]: string }
> = {
  SHOW_ALL: `/${t.Filter.SHOW_ALL}`,
  SHOW_ACTIVE: `/${t.Filter.SHOW_ACTIVE}`,
  SHOW_COMPLETED: `/${t.Filter.SHOW_COMPLETED}`
};

class HomePage extends Component<Props, {}> {
  userInputEle!: HTMLInputElement;

  handleUserInputFieldOnKeyUp = (
    evt: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyPressed = evt.key;
    if (keyPressed !== "Enter") {
      return;
    }
    const newTodoText = this.userInputEle.value;
    this.validateAndAddToDo(newTodoText);
  };

  isUserInputValid = (newTodoText: string) => {
    if (newTodoText === "") {
      return false;
    }
    return true;
  };

  handleAddToDoButtonOnClick = () => {
    const newTodoText = this.userInputEle.value;
    this.validateAndAddToDo(newTodoText);
  };

  validateAndAddToDo = (newTodoText: string) => {
    const isValid = this.isUserInputValid(newTodoText);
    if (!isValid) {
      alert("empty item!");
      return;
    }
    this.addNewToDoItemToState(newTodoText);
    this.resetInputField();
    // this.goToActiveTodoPathIfCurrentlyInCompletedPath()
  };

  // goToActiveTodoPathIfCurrentlyInCompletedPath = () => {
  //   if (this.state.visibiltyFilter === VisiblityFilters.SHOW_COMPLETED) {
  //     this.props.history.push(VisibiltyFilterToPathMap.SHOW_ACTIVE)
  //   }
  // }

  resetInputField = () => {
    this.userInputEle.value = "";
    this.userInputEle.autofocus = true;
  };

  addNewToDoItemToState = (newTodoText: string) => {
    const id = uuidv1();
    ReduxStore.dispatch(actions.ADD_TODO(id, newTodoText));
  };

  toggleToDo = (id: string) => {
    ReduxStore.dispatch(actions.TOGGLE_TODO(id));
  };

  getVisibleTodos = (todos: t.TodoList, filter: t.Filter): t.TodoList => {
    switch (filter) {
      case t.Filter.SHOW_ALL:
        return todos;

      case t.Filter.SHOW_ACTIVE:
        return todos.filter(todo => {
          return !todo.completed;
        });

      case t.Filter.SHOW_COMPLETED:
        return todos.filter(todo => {
          return todo.completed;
        });
    }
  };

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

  showFilteredTodos = (filter: t.Filter) => {
    ReduxStore.dispatch(actions.CHANGE_FILTER(filter));
  };

  render() {
    const { todoList, filter } = this.props;
    const visibleTodos = this.getVisibleTodos(todoList, filter);
    return (
      <s.Page>
        <s.PageContainer>
          <s.Header>To-Do List</s.Header>
          <s.StyledFilterLinks
            onFilterClick={this.showFilteredTodos}
            currentFilter={filter}
          />
          <s.TodoInputAndButtonContainer>
            <s.UserInputField
              ref={node => {
                this.userInputEle = node as HTMLInputElement;
              }}
              autoFocus
              placeholder="write todo..."
              onKeyUp={this.handleUserInputFieldOnKeyUp}
            />
            <s.AddTodoButton onClick={this.handleAddToDoButtonOnClick}>
              Add ToDo
            </s.AddTodoButton>
          </s.TodoInputAndButtonContainer>
          <s.ListContainer>
            <TodoList
              visibleTodos={visibleTodos}
              onTodoClick={this.toggleToDo}
            />
          </s.ListContainer>
        </s.PageContainer>
      </s.Page>
    );
  }
}

export default HomePage;
