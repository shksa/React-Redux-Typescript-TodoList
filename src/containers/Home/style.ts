import { theme } from "../App/style";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { InlineContainer } from "../../components/Common";
import FilterLinks from "../../components/FilterLinks";

export const Header = styled(InlineContainer)`
  justify-content: center;
  align-items: center;
  font-size: 2em;
`;

export const UserInputField = styled.input`
  padding: 0.5em 1em;
  font-size: 1em;
  border-radius: 10px;
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

export const ListContainer = styled.div`
  overflow-y: scroll;
`;

export const StyledFilterLinks = styled(FilterLinks)``;

export const TodoInputAndButtonContainer = styled(InlineContainer)`

`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${Header} { 
    height: 10%;
  }
  ${TodoInputAndButtonContainer} {
    height: 8%;
  }
  ${UserInputField} {
    margin-right: 1em;
  }
  ${ListContainer} {
    flex: 1;
  }
  ${StyledFilterLinks} {
    height: 10%;
  }
`;

export const Page = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  ${PageContainer} {
    margin-top: 10%;
    margin-bottom: 15%;
  }
`;