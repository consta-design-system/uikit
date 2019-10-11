import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M8 6.406l-4.297 4.297-1.414-1.414L8 3.577l5.711 5.712-1.414 1.414L8 6.406z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5.5 5.207L2.354 8.354l-.708-.708L5.5 3.793l3.854 3.853-.708.708L5.5 5.207z"/></svg>
      );
  }
};
export default SVG;
