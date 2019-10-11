import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M14 11c0 .552-.447 1-.999 1H4.167L2 14V3.996A.997.997 0 013 3h10a1 1 0 011 1v7z"/></svg>
      );
  }
};
export default SVG;
