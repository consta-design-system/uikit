import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7.5 5C8.33 5 9 4.33 9 3.5S8.33 2 7.5 2 6 2.67 6 3.5 6.67 5 7.5 5zm0 2C6.67 7 6 7.67 6 8.5S6.67 10 7.5 10 9 9.33 9 8.5 8.33 7 7.5 7zm0 5c-.83 0-1.5.67-1.5 1.5S6.67 15 7.5 15 9 14.33 9 13.5 8.33 12 7.5 12z"/></svg>
      );
  }
};
export default SVG;
