import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M7 17v2h10v-2H7zm-4-2h18v-2H3v2zm4-6v2h10V9H7zM3 5v2h18V5H3z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M13 3H3v2h10V3zM1 7h14v2H1V7zM3 11h10v2H3v-2z"/></svg>
      );
  }
};
export default SVG;
