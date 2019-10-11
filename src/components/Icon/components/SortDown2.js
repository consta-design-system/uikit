import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M2 3h12v2H2V3zM4 7h8v2H4V7zM10 11H6v2h4v-2z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M11 3v1H1V3h10zM9 6v1H3V6h6zM8 10V9H4v1h4z"/></svg>
      );
  }
};
export default SVG;
