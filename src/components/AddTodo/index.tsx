import React, { FunctionComponent } from "react";
import * as s from "./style";

const handleUserInputFieldOnKeyUp = (
  evt: React.KeyboardEvent<HTMLInputElement>,
  addNewTodoItem: (text: string) => void
) => {
  const keyPressed = evt.key;
  if (keyPressed !== "Enter") {
    return;
  }
  const newTodoText = evt.currentTarget.value;
  const isValid = isUserInputValid(newTodoText);
  if (isValid) {
    addNewTodoItem(newTodoText);
  } else {
    alertUserOfInvalidInput();
  }
  resetInputField(evt.currentTarget);
};

const alertUserOfInvalidInput = () => {
  alert("empty item!");
};

const isUserInputValid = (newTodoText: string) => {
  if (newTodoText === "") {
    return false;
  }
  return true;
};

const handleAddToDoButtonOnClick = (
  userInputEle: HTMLInputElement,
  addNewTodoItem: (text: string) => void
) => {
  const newTodoText = userInputEle.value;
  const isValid = isUserInputValid(newTodoText);
  if (isValid) {
    addNewTodoItem(newTodoText);
  } else {
    alertUserOfInvalidInput();
  }
  resetInputField(userInputEle);
};

const resetInputField = (element: HTMLInputElement) => {
  element.value = "";
  element.autofocus = true;
};

interface Props {
  onAddNewTodo: (text: string) => void;
  className?: string;
}

const AddTodo: FunctionComponent<Props> = ({ onAddNewTodo, className }) => {
  let userInputEle: HTMLInputElement;
  return (
    <s.TodoInputAndButtonContainer className={className}>
      <s.UserInputField
        ref={node => {
          userInputEle = node as HTMLInputElement;
        }}
        autoFocus
        placeholder="write todo..."
        onKeyUp={e => handleUserInputFieldOnKeyUp(e, onAddNewTodo)}
      />
      <s.AddTodoButton
        onClick={() => handleAddToDoButtonOnClick(userInputEle, onAddNewTodo)}
      >
        Add ToDo
      </s.AddTodoButton>
    </s.TodoInputAndButtonContainer>
  );
};

export default AddTodo;
