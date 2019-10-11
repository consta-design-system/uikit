import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M0 0h24v24H0z"/><path d="M4 4v10h2v2H3a1 1 0 01-1-1V3a1 1 0 011-1h12a1 1 0 011 1v3h-2V4H4zm4 5a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V9zm2 11V10h10v10H10z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M0 1a1 1 0 011-1h9a1 1 0 011 1v3H9V2H2v7h2v2H1a1 1 0 01-1-1V1z"/><path d="M6 5a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V6a1 1 0 00-1-1H6zm8 2H7v7h7V7z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M1 1a1 1 0 00-1 1v6a1 1 0 001 1h1V8H1V2h6v1h1V2a1 1 0 00-1-1H1zm2 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm1 0h6v6H4V5z"/></svg>
      );
  }
};
export default SVG;
