import styled from "@emotion/styled";
import {css} from "@emotion/core"
import { ComponentType } from "react";

type LiProps = {
  completed: boolean;
};

const li = styled.li<LiProps>``

export const Li = styled(li)`
  font-size: 1.2em;
  cursor: pointer;
  ${({completed}) => css`
    text-decoration-line: ${completed ? "line-through" : "none"};
    :active {
      text-decoration-line: ${completed ? "none" : "line-through"};
    }
  `}
`
