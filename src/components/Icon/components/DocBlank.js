import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0013.586 2H6zm8 7a1 1 0 01-1-1V3.5L18.5 9H14z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M14 5.414a1.5 1.5 0 00-.44-1.06L9.647.439A1.5 1.5 0 008.586 0H3a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V6v-.586zM12.793 5H9.5a.5.5 0 01-.5-.5V1.207L12.793 5z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  }
};
export default SVG;
