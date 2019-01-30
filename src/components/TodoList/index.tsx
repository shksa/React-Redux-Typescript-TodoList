import React, { FunctionComponent } from "react";
import * as s from "./style";
import * as cs from "../Common";
import * as t from "../../redux/types";
import TodoItem from "./TodoItem";

interface Props {
  visibleTodos: t.TodoList;
  onTodoClick: (id: string) => void;
  className?: string;
}

const TodoList: FunctionComponent<Props> = ({
  visibleTodos,
  onTodoClick,
  className,
}) => (
  <s.Ul className={className}>
    {visibleTodos.map(toDoItem => (
      <cs.InlineContainer key={toDoItem.id}>
        <TodoItem {...toDoItem} onTodoClick={() => onTodoClick(toDoItem.id)} />
      </cs.InlineContainer>
    ))}
  </s.Ul>
);

export default TodoList
