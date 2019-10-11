import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M3 19h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V9H3v2zm0-6v2h18V5H3z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M15 3H1v2h14V3zM1 7h14v2H1V7zM1 11h14v2H1v-2z"/></svg>
      );
  }
};
export default SVG;
