import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M8.205 1a1 1 0 00-1 1v1.143a1 1 0 001 1h.565v6.286l-2.375 3.815 10.226-1.26-1.59-2.555V4.143h.564a1 1 0 001-1V2a1 1 0 00-1-1h-7.39zm9.33 13.454L5.329 15.959l-3.241 5.207A1.2 1.2 0 003.105 23h17.59a1.2 1.2 0 001.019-1.834l-4.178-6.712z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M6 1a1 1 0 100 2v4L4.482 9.428l6.534-.802L10 7V3a1 1 0 000-2H6zm5.601 8.562l-7.8.957-1.654 2.645A1.2 1.2 0 003.165 15h9.67a1.2 1.2 0 001.017-1.836l-2.251-3.602z"/></svg>
      );
  }
};
export default SVG;
