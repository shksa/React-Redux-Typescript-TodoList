import styled from "../../styled-components";

export const Header = styled.div`
  text-align: center;
  font-size: 2em;
`

export const UserInputField = styled.input`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 10px;
`

export const AddTodoButton = styled.button`
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 900;
  font-size: 1em;
  background-color: lightcoral;
  color: white;
  box-shadow: 10px 10px 20px gray;
  :hover {
    box-shadow: 5px 5px 20px gray; 
  };
  transition: box-shadow .35s ease-in-out;
`

export const PageContainer = styled.div`
  & > ${Header} {
    margin: 1em;
  }
  & > ${UserInputField} {
    margin-right: 1em;
  }
`

export const Page = styled.div`
  height: 100vh;
  background-color: ${({theme}) => theme.background};
  display: flex;
  justify-content: center;
  & > ${PageContainer} {
    margin-top: 10%;
  }
`

export const ToDoItemsList = styled.ul`
  font-size: 1em;
`

export const ToDoItem = styled.li``

export const Link = styled.a``

export const InlineContainer = styled.div`
  display: flex;
  padding: 0px 0.5em;
  justify-content: center;
  & > ${Link} {
    margin-right: 1em;
  }
  & > ${Link} :last-child {
    margin-right: 0em;
  }
`