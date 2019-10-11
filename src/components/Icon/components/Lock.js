import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M17 8h2c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h2V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2zM8.9 6v2h6.2V6c0-1.71-1.39-3.1-3.1-3.1-1.71 0-3.1 1.39-3.1 3.1zM12 18a3 3 0 100-6 3 3 0 000 6z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M5 5H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1h-1V4a3 3 0 00-6 0v1zm1 0h4V4a2 2 0 10-4 0v1zm.5 4a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/></svg>
      );
  }
};
export default SVG;
