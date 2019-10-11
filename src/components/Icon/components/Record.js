import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><rect width="8" height="8" x="8" y="8" rx="4"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><rect width="4" height="4" x="6" y="6" rx="2"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><rect width="4" height="4" x="4" y="4" rx="2"/></svg>
      );
  }
};
export default SVG;
