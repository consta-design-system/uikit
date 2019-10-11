import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M15 17H3v2h12v-2zm0-8H3v2h12V9zM3 15h18v-2H3v2zM3 5v2h18V5H3z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M11 3H1v2h10V3zM1 7h14v2H1V7zM1 11h10v2H1v-2z"/></svg>
      );
  }
};
export default SVG;
