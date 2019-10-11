import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M8.5 12c2.76 0 4.5-2.24 4.5-5V1h-2v6.5a2.5 2.5 0 01-5 0V1H4v6c0 2.76 1.74 5 4.5 5zM3 13v2h11v-2H3z"/></svg>
      );
  }
};
export default SVG;
