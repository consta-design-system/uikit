import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6 2.5a1 1 0 011-1h1a1 1 0 011 1V4h6V2.5a1 1 0 011-1h1a1 1 0 011 1V4h3a2 2 0 012 2v2H1V6a2 2 0 012-2h3V2.5z"/><path d="M19.857 10.09H4.143v7.82h15.714v-7.82zM1 7v12a2 2 0 002 2h18a2 2 0 002-2V7H1z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M4 2a1 1 0 012 0v1h4V2a1 1 0 112 0v1h2a1 1 0 011 1v3H1V4a1 1 0 011-1h2V2z"/><path d="M13 6H3v7h10V6zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z"/></svg>
      );
  }
};
export default SVG;
