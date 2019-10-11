import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M3 8h6V6H3v2zm0 8v2h18v-2H3zm0-3h12v-2H3v2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M6 5H2V3h4v2zM2 7v2h8V7H2zM2 13h12v-2H2v2z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5 3v1H1V3h4zM8 7V6H1v1h7zM11 10V9H1v1h10z"/></svg>
      );
  }
};
export default SVG;
