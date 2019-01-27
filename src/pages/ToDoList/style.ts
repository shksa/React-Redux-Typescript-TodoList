import {NavLink} from 'react-router-dom'
import styled, {keyframes, css} from "../../styled-components";
import { theme } from "../App/style";
import { CSSObject } from 'styled-components';

export const Header = styled.div`
  text-align: center;
  font-size: 2em;
`

export const UserInputField = styled.input`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 10px;
`

const Levitate = (bgColor1: string, bgColor2: string) => keyframes`
  0% {
    box-shadow: 10px 10px 20px gray;
    background-color: ${bgColor1};
  }
  50% {
    box-shadow: 5px 5px 20px gray; 
    background-color: ${bgColor2};
  }
  100% {
    box-shadow: 10px 10px 20px gray;
    background-color: ${bgColor1};
  }
`

const NormalLevitate = Levitate(theme.buttonColor1, theme.buttonColor2)
const HoverLevitate = Levitate(theme.buttonOnHoverColor1, theme.buttonOnHoverColor2)


export const AddTodoButton = styled.button`
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bolder;
  font-size: 1em;
  color: white;
  animation: ${NormalLevitate} 2s ease-in-out infinite; 
  :hover {
    animation: ${HoverLevitate} 2s ease-in-out infinite; 
  }
`

export const PageContainer = styled.div`
  ${Header} {
    margin: 1em;
  }
  ${UserInputField} {
    margin-right: 1em;
  }
`

export const Page = styled.div`
  height: 100vh;
  background-color: ${({theme}) => theme.background};
  display: flex;
  justify-content: center;
  ${PageContainer} {
    margin-top: 10%;
  }
`

export const ToDoItem = styled.li<{completed: boolean}>`
  font-size: 1em;
  text-decoration: ${({completed}) => completed && 'line-through'};
  cursor: pointer;
`

export const ActiveLinkStyle: CSSObject = {
  fontSize: '1.5em',
  color: 'blue',
}

export const RouteLink = styled(NavLink)`
  font-size: 1em;
  color: black;
`

export const InlineContainer = styled.div`
  display: flex;
`

export const ToDoItemsList = styled.ul`
  ${InlineContainer} {
    margin: 1em;
  }
`

export const Footer = styled(InlineContainer)`
  padding: 0px 0.5em;
  justify-content: center;
  align-items: center;
  ${RouteLink} {
    margin-right: 1em;
  }
  ${RouteLink} :last-child {
    margin-right: 0em;
  }
`