import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M9 4a1 1 0 011-1h4a1 1 0 011 1v16a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6H0v-4h9V4zm15 6h-5v4h5v-4z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><rect width="4" height="12" x="6" y="2" rx="1"/><path d="M0 7h6v2H0zM12 7h4v2h-4z"/></svg>
      );
  }
};
export default SVG;
