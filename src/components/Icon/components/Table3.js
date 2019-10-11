import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M0 0h24v24H0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 9H3m18 6H3m9-12v18M3 3h18v18H3V3z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M0 0h16v16H0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.333" d="M8 2v12M2 2h12v12H2V2zm12 4H2h12zm0 4H2h12z"/></svg>
      );
  }
};
export default SVG;
