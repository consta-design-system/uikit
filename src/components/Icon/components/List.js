import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M4 3H2v2h2V3zM14 3H5v2h9V3zM5 7h9v2H5V7zM14 11H5v2h9v-2zM2 7h2v2H2V7zM4 11H2v2h2v-2z"/></svg>
      );
  }
};
export default SVG;
