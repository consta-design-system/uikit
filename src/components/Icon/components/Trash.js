import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M0 0h24v24H0z"/><path d="M5 19c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6H5v13zM21 4h-6V3a1 1 0 00-1-1h-4a1 1 0 00-1 1v1H3v2h18V4z"/><path d="M9 8h2v9H9zM13 8h2v9h-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7 1a1 1 0 00-1 1v1H2v1h1v9a2 2 0 002 2h6a2 2 0 002-2V4h1V3h-4V2a1 1 0 00-1-1H7zM6 6h1v6H6V6zm4 0H9v6h1V6z"/></svg>
      );
  }
};
export default SVG;
