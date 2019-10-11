import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M1 12h2v.5H2v1h1v.5H1v1h3v-4H1v1zm0-5h1.8L1 9.1v.9h3V9H2.2L4 6.9V6H1v1zm1-2h1V1H1v1h1v3zm4-3v2h9V2H6zm0 12h9v-2H6v2zm0-5h9V7H6v2z"/></svg>
      );
  }
};
export default SVG;
