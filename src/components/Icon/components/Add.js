import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M0 0h24v24H0z"/><path d="M13 2h-2v9H2v2h9v9h2v-9h9v-2h-9V2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M9 2H7v5H2v2h5v5h2V9h5V7H9V2z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M6 3H5v3H2v1h3v3h1V7h3V6H6V3z"/></svg>
      );
  }
};
export default SVG;
