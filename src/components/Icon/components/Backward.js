import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M5.407 7l3.297-3.297L7.29 2.289 1.579 8l5.711 5.711 1.414-1.414L5.407 9H14V7H5.407z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M2.71 6l2.647-2.646-.707-.708L.796 6.5l3.854 3.854.707-.708L2.711 7H10V6H2.71z"/></svg>
      );
  }
};
export default SVG;
