import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M5 5v3h5.5v12h3V8H19V5H5z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M3 2v2h4.5v10h2V4H14V2H3z"/></svg>
      );
  }
};
export default SVG;
