import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M9.594 8L5.297 3.703l1.414-1.414L12.423 8 6.71 13.711l-1.414-1.414L9.594 8z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M6.793 6.5L3.646 3.354l.708-.708L8.207 6.5l-3.853 3.854-.708-.708L6.793 6.5z"/></svg>
      );
  }
};
export default SVG;
