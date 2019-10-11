import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M9 19h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V9H9v2zM3 5v2h18V5H3z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M15 3H5v2h10V3zM1 7h14v2H1V7zM5 11h10v2H5v-2z"/></svg>
      );
  }
};
export default SVG;
