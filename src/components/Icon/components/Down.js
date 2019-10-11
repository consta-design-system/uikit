import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M11 4v12.17l-5.59-5.59L4 12l8 8 8-8-1.41-1.41L13 16.17V4h-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7 10.593L3.703 7.296 2.289 8.71l5.71 5.711 5.712-5.711-1.414-1.414L9 10.593V2H7v8.593z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5 9.29L2.354 6.642l-.708.707L5.5 11.204 9.354 7.35l-.708-.707L6 9.289V2H5v7.29z"/></svg>
      );
  }
};
export default SVG;
