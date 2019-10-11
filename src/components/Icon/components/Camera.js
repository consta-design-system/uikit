import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M7.17 5l.574-1.383A1 1 0 018.668 3h6.664a1 1 0 01.924.617L16.83 5H20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3.17zM18 13a6 6 0 11-12 0 6 6 0 0112 0zm-6 4a4 4 0 100-8 4 4 0 000 8z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M5.862 2.276A.5.5 0 016.309 2h3.382a.5.5 0 01.447.276L10.5 3H14a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1h3.5l.362-.724zM4 8a4 4 0 118 0 4 4 0 01-8 0zm4 3a3 3 0 100-6 3 3 0 000 6z"/></svg>
      );
  }
};
export default SVG;
