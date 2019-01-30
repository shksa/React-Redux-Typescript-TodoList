import React from "react";
import * as s from './style'
import * as cs from '../Common'
import * as t from "../../redux/types";
import TodoItem from './TodoItem'

interface Props {
  visibleTodos: t.TodoList
  onTodoClick: (id: string) => void
  className?: string
}

export default function TodoList({visibleTodos, onTodoClick, className}: Props) {
  return (
    <s.Ul className={className}>
      {visibleTodos.map(toDoItem => (
        <cs.InlineContainer key={toDoItem.id}>
          <TodoItem {...toDoItem} onTodoClick={() => onTodoClick(toDoItem.id)} />
        </cs.InlineContainer>
      ))}
    </s.Ul>
  );
}
