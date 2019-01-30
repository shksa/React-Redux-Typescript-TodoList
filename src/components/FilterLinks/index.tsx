import React, { FunctionComponent } from "react";
import * as s from "./style";
import * as t from "../../redux/types";

interface Props {
  onFilterClick: (filter: t.Filter) => void;
  currentFilter: t.Filter;
  className?: string;
}

const FilterLinks: FunctionComponent<Props> = ({
  className,
  currentFilter,
  onFilterClick
}) => (
  // @ts-ignore
  <s.FilterLinksContainer className={className}>
    <s.FilterLink
      isActive={currentFilter === t.Filter.SHOW_ALL}
      onClick={() => onFilterClick(t.Filter.SHOW_ALL)}
    >
      All
    </s.FilterLink>
    <s.FilterLink
      isActive={currentFilter === t.Filter.SHOW_ACTIVE}
      onClick={() => onFilterClick(t.Filter.SHOW_ACTIVE)}
    >
      Active
    </s.FilterLink>
    <s.FilterLink
      isActive={currentFilter === t.Filter.SHOW_COMPLETED}
      onClick={() => onFilterClick(t.Filter.SHOW_COMPLETED)}
    >
      Completed
    </s.FilterLink>
  </s.FilterLinksContainer>
);
export default FilterLinks;
