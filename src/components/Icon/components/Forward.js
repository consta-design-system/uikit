import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M10.594 7L7.297 3.703l1.414-1.414L14.423 8 8.71 13.711l-1.414-1.414L10.594 9H2V7h8.594z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M8.293 7H1V6h7.293L5.646 3.354l.708-.708L10.207 6.5l-3.853 3.854-.708-.708L8.293 7z"/></svg>
      );
  }
};
export default SVG;
