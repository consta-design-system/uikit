import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M8 9.593L3.703 5.296 2.289 6.71 8 12.421l5.711-5.71-1.414-1.415L8 9.593z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5.5 7.79L2.354 4.642l-.708.707L5.5 9.204 9.354 5.35l-.708-.707L5.5 7.789z"/></svg>
      );
  }
};
export default SVG;
