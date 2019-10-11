import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M10 5v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V5h-8z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M6 2v2h2.58l-3.66 8H2v2h8v-2H7.42l3.66-8H14V2H6z"/></svg>
      );
  }
};
export default SVG;
