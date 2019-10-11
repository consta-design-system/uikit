import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0013.586 2H6zm8 7a1 1 0 01-1-1V3.5L18.5 9H14zm2 9v2h-2v-2h-2v-2h2v-2h2v2h2v2h-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M13.56 4.354a1.5 1.5 0 01.44 1.06V14a1 1 0 01-1 1H3a1 1 0 01-1-1V1a1 1 0 011-1h5.586a1.5 1.5 0 011.06.44l3.915 3.914zM9.5 5h3.293L9 1.207V4.5a.5.5 0 00.5.5zM9 13v-2H7v-1h2V8h1v2h2v1h-2v2H9z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  }
};
export default SVG;
