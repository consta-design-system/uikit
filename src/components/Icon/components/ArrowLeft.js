import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M6.407 8l4.297-4.297L9.29 2.289 3.579 8l5.711 5.711 1.414-1.414L6.407 8z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M4.21 6.5l3.147-3.146-.707-.708L2.796 6.5l3.854 3.854.707-.708L4.211 6.5z"/></svg>
      );
  }
};
export default SVG;
