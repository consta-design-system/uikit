import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-5.707-5.707A1 1 0 0013.586 2H6zm8 7a1 1 0 01-1-1V3.5L18.5 9H14zm-7 4h10v2H7v-2zm6 3H7v2h6v-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M14 5.414a1.5 1.5 0 00-.44-1.06L9.647.439A1.5 1.5 0 008.586 0H3a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V5.414zM12.793 5H9.5a.5.5 0 01-.5-.5V1.207L12.793 5zM11 9H4V8h7v1zm-7 3h5v-1H4v1z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  }
};
export default SVG;
