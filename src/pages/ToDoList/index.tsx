import React, {Component} from 'react';
import * as s from './style'

export interface Props {
  
}
 
export interface State {
  
}
 
export default class ToDoList extends React.Component<Props, State> {
  render() { 
    return (
      <s.Page>
        <s.PageContainer>
          <s.Header>To-Do List</s.Header>
          <s.UserInputField placeholder='write todo' /><s.AddTodoButton>Add ToDo</s.AddTodoButton>
          <s.ToDoItemsList>
            <s.ToDoItem>Hey</s.ToDoItem>
          </s.ToDoItemsList>
          <s.InlineContainer>
            <s.Link href='#'>All</s.Link>
            <s.Link href='#'>Active</s.Link>
            <s.Link href='#'>Completed</s.Link>
          </s.InlineContainer>
        </s.PageContainer>
      </s.Page>
    )
  }
}