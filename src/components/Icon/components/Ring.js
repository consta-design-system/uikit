import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5h-.5a1.5 1.5 0 000 3h13a1.5 1.5 0 000-3H18z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M8 1a1 1 0 00-.992 1.124A4.002 4.002 0 004 6v3a1 1 0 000 2h8a1 1 0 100-2V6a4.002 4.002 0 00-3.008-3.876A1 1 0 008 1zm2 11a2 2 0 11-4 0h4z"/></svg>
      );
  }
};
export default SVG;
