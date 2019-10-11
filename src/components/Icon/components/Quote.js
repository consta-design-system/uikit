import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M9 4v5h2.75L10 12h2.25L14 9V4H9zM2 9h2.75L3 12h2.25L7 9V4H2v5z"/></svg>
      );
  }
};
export default SVG;
