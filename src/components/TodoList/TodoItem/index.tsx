import React from "react";
import * as s from "./style";
import * as t from "../../../redux/types";

interface Props extends t.TodoItem {
  onTodoClick: () => void
  className?: string
}

export default function TodoItem({ id, text, completed, onTodoClick, className }: Props) {
  return (
    <s.Li className={className} onClick={onTodoClick} completed={completed}>
      {text}
    </s.Li>
  );
};
