import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M8.5 0h7l-2.75 5h-1.5L8.5 0z"/><path d="M7.5 20l4.5 4 4.5-4-3.833-18h-1.334L7.5 20z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M6 0h4L8.5 3h-1L6 0z"/><path d="M5 13.5L8 16l3-2.5L8.5 2h-1L5 13.5z"/></svg>
      );
  }
};
export default SVG;
