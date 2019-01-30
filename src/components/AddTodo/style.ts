import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { theme } from "../../containers/App/style";
import { InlineContainer } from "../Common";

export const UserInputField = styled.input`
  padding: 0.5em 1em;
  font-size: 1em;
  border-radius: 10px;
`;

export const TodoInputAndButtonContainer = styled(InlineContainer)`
  ${UserInputField} {
    margin-right: 1em;
  }
`;



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
`;

const NormalLevitate = Levitate(theme.buttonColor1, theme.buttonColor2);
const HoverLevitate = Levitate(
  theme.buttonOnHoverColor1,
  theme.buttonOnHoverColor2
);

export const AddTodoButton = styled.button`
  border-radius: 10px;
  cursor: pointer;
  font-weight: bolder;
  font-size: 1em;
  color: white;
  animation: ${NormalLevitate} 2s ease-in-out infinite;
  :hover {
    animation: ${HoverLevitate} 2s ease-in-out infinite;
  }
`;
