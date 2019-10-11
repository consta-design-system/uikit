import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M7 5.406L3.703 8.703 2.289 7.289l5.71-5.712 5.712 5.712-1.414 1.414L9 5.406V14H7V5.406z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M6 3.707V11H5V3.707L2.354 6.354l-.708-.708L5.5 1.793l3.854 3.853-.708.708L6 3.707z"/></svg>
      );
  }
};
export default SVG;
