import styled from "@emotion/styled";
import {css} from "@emotion/core"
import { InlineContainer } from "../Common";

type FilterLinkProps = {
  isActive: boolean;
};

const a = styled.a<FilterLinkProps>``

export const FilterLink = styled(a)`
  font-size: 1em;
  color: blue;
  cursor: pointer;
  text-decoration-line: underline;
  ${({isActive}) => isActive && css`
    font-size: 1.5em;
    color: red;
    text-decoration-line: unset;
  `}
`

export const FilterLinksContainer = styled(InlineContainer)`
  justify-content: center;
  align-items: center;
  ${FilterLink} {
    margin-right: 1em;
    :last-child {
      margin-right: 0em;
    }
  }
`