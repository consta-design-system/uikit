import React from "react";
const SVG = props => {
  switch (props.size) {
   case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M14 5l-3-3-1.414 1.414 3 3L14 5zm-2.121 2.121l-3-3L2 11v3h3l6.879-6.879z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M8.786 5.214L10 4 8 2 6.786 3.214l2 2zm-.572.572l-2-2L2 8v2h2l4.214-4.214z"/></svg>
      );
  }
};
export default SVG;
