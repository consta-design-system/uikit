import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M10.5 3a7.5 7.5 0 104.136 13.758L19.5 21.62 21.62 19.5l-4.864-4.864A7.5 7.5 0 0010.5 3zM6 10.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7 2a5 5 0 102.757 9.172L13 14.414 14.414 13l-3.242-3.243A5 5 0 007 2zM4 7a3 3 0 116 0 3 3 0 01-6 0z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5.25 1.5a3.75 3.75 0 102.068 6.879L9.75 10.81l1.06-1.061L8.38 7.318A3.75 3.75 0 005.25 1.5zM3 5.25a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"/></svg>
      );
  }
};
export default SVG;
