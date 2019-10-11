import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7 2H3v12h4V2zm6 0H9v12h4V2z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5 3H2v7h3V3zm4 0H6v7h3V3z"/></svg>
      );
  }
};
export default SVG;
