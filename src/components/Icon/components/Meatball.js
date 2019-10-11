import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M3.5 7C2.67 7 2 7.67 2 8.5S2.67 10 3.5 10 5 9.33 5 8.5 4.33 7 3.5 7zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S15 9.33 15 8.5 14.33 7 13.5 7zm-5 0C7.67 7 7 7.67 7 8.5S7.67 10 8.5 10 10 9.33 10 8.5 9.33 7 8.5 7z"/></svg>
      );
  }
};
export default SVG;
