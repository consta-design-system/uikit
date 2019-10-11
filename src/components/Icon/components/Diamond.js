import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M18.75 2.75L21 8h-6l2.571-6H6L0 8l10.737 13.421L6 8h6v15L24 8l-5.25-5.25z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M13 6h-3l1.6-4H4L0 5.9l7.266 8.265L4 6h4v9l8-9.1-3.752-3.658L13 6z"/></svg>
      );
  }
};
export default SVG;
