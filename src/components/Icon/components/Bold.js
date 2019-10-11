import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M11.13 7.82c.83-.58 1.37-1.44 1.37-2.32C12.5 3.57 10.93 2 9 2H3v12h6.75c1.79 0 3.25-1.46 3.25-3.25 0-1.3-.77-2.41-1.87-2.93zM5.5 4h3.25c.83 0 1.5.67 1.5 1.5S9.58 7 8.75 7H5.5V4zm3.75 8H5.5V9h3.75c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
      );
  }
};
export default SVG;
