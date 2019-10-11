import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path stroke-linejoin="round" stroke-width="2" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.379 8.379 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path stroke-linejoin="round" stroke-width="2" d="M14 7.667a5.587 5.587 0 01-.6 2.533 5.667 5.667 0 01-5.067 3.133 5.588 5.588 0 01-2.533-.6L2 14l1.267-3.8a5.586 5.586 0 01-.6-2.533A5.667 5.667 0 015.8 2.6 5.587 5.587 0 018.333 2h.334A5.653 5.653 0 0114 7.333v.334z"/></svg>
      );
  }
};
export default SVG;
