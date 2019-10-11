import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M2 3h12v2H2V3zM2 7h8v2H2V7zM6 11H2v2h4v-2z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M11 3v1H1V3h10zM8 6v1H1V6h7zM5 10V9H1v1h4z"/></svg>
      );
  }
};
export default SVG;
