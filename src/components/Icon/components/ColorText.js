import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M5.5 17L11 3h2l5.49 14h-2.25l-1.12-3H8.87l-1.12 3H5.5zM12 5.67L9.62 12h4.76L12 5.67z"/><path d="M24 24v-4H0v4h24z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7.095 2h1.82L13 12h-1.82l-1.019-2.5H5.84L4.819 12H3L7.095 2zm.91 2.225L6.53 7.833H9.48L8.005 4.225z"/><path d="M16 14H0v2h16v-2z"/></svg>
      );
  }
};
export default SVG;
