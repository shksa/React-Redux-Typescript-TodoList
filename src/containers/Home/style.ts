import { theme } from "../App/style";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { InlineContainer } from "../../components/Common";
import FilterLinks from "../../components/FilterLinks";
import AddTodo from "../../components/AddTodo";

export const Header = styled(InlineContainer)`
  justify-content: center;
  align-items: center;
  font-size: 2em;
`;



export const ListContainer = styled.div`
  overflow-y: scroll;
`;

export const StyledFilterLinks = styled(FilterLinks)``;

export const StyledAddTodo = styled(AddTodo)``

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${Header} { 
    height: 10%;
  }
  ${StyledAddTodo} {
    height: 8%;
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