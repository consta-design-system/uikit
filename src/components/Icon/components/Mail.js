import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M20.8 3H3.2C1.99 3 1.011 4.013 1.011 5.25L1 18.75C1 19.988 1.99 21 3.2 21h17.6c1.21 0 2.2-1.012 2.2-2.25V5.25C23 4.013 22.01 3 20.8 3zm0 15.75H3.2V7.5l8.8 5.625L20.8 7.5v11.25zM12 10.875L3.2 5.25h17.6L12 10.875z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M2.5 2A1.5 1.5 0 001 3.5v9A1.5 1.5 0 002.5 14h11a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0013.5 2h-11zM3 5.92V12h10V5.92l-5 3.5-5-3.5zM12.256 4H3.744L8 6.98 12.256 4z"/></svg>
      );
  }
};
export default SVG;
