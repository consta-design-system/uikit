import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M3 2.5C3 1.67 3.674 1 4.501 1H11.5C12.326 1 13 1.67 13 2.5v12.241l-5-2.917-5 2.917V2.501zM5 3v8.259l3-1.75 3 1.75V3H5z"/></svg>
      );
  }
};
export default SVG;
