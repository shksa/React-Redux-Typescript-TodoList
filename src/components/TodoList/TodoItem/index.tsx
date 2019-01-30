import React, { FunctionComponent } from "react";
import * as s from "./style";
import * as t from "../../../redux/types";

interface Props extends t.TodoItem {
  onTodoClick: () => void;
  className?: string;
}

const TodoItem: FunctionComponent<Props> = ({
  text,
  completed,
  onTodoClick,
  className
}) => (
  <s.Li className={className} onClick={onTodoClick} completed={completed}>
    {text}
  </s.Li>
);

export default TodoItem
