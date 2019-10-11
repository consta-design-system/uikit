import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M15 3v6h6v2h-8V3h2zM9 21v-6H3v-2h8v8H9z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M10 2H8v6H2v2h4v4h2V8h6V6h-4V2z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M8 1H6v5H1v2h3v3h2V6h5V4H8V1z"/></svg>
      );
  }
};
export default SVG;
