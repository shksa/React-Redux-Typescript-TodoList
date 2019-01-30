import React, { Component, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import * as s from "./style";
// import { PathParams } from '../App';
import uuidv1 from "uuid/v1";
import * as t from "../../redux/types";
import { ReduxStore } from "../App";
import * as actions from "../../redux/actions";
import TodoList from "../../components/TodoList";
import AddTodo from "../../components/AddTodo";

export interface Props extends t.AppState {}

export const VisibiltyFilterToPathMap: Readonly<
  { [key in t.Filter]: string }
> = {
  SHOW_ALL: `/${t.Filter.SHOW_ALL}`,
  SHOW_ACTIVE: `/${t.Filter.SHOW_ACTIVE}`,
  SHOW_COMPLETED: `/${t.Filter.SHOW_COMPLETED}`
};



const addNewTodoItem = (newTodoText: string) => {
  const id = uuidv1();
  ReduxStore.dispatch(actions.ADD_TODO(id, newTodoText));
};

const toggleTodoItem = (id: string) => {
  ReduxStore.dispatch(actions.TOGGLE_TODO(id));
};

const changeFilter = (filter: t.Filter) => {
  ReduxStore.dispatch(actions.CHANGE_FILTER(filter));
};

const getVisibleTodos = (todos: t.TodoList, filter: t.Filter): t.TodoList => {
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



const HomePage: FunctionComponent<t.AppState> = ({ todoList, filter }) => {
  return (
    <s.Page>
      <s.PageContainer>
        <s.Header>To-Do List</s.Header>
        <s.StyledFilterLinks
          onFilterClick={changeFilter}
          currentFilter={filter}
        />
        <s.StyledAddTodo onAddNewTodo={addNewTodoItem} />
        <s.ListContainer>
          <TodoList visibleTodos={getVisibleTodos(todoList, filter)} onTodoClick={toggleTodoItem} />
        </s.ListContainer>
      </s.PageContainer>
    </s.Page>
  );
}

export default HomePage