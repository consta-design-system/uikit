import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M19 5h-8V3h10v10h-2V5zM5 19v-8H3v10h10v-2H5z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M12 4H7.048V2H14v6.952h-2V4zm-8 8V7.048H2V14h6.952v-2H4z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M9 3H5V1h6v6H9V3zM3 9V5H1v6h6V9H3z"/></svg>
      );
  }
};
export default SVG;
