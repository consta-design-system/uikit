import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><g clip-path="url(#clip0)"><path d="M0 0h24v24H0z"/><path d="M10.057 15.633l-6.129-5.142L2 12.789l8.427 7.07 11.57-13.788-2.299-1.929-9.641 11.491z"/></g><defs><clipPath id="clip0"><path d="M0 0h24v24H0z"/></clipPath></defs></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M6.799 10.417L3.124 7.08 1.779 8.56l5.215 4.737 7.739-9.223-1.532-1.286-6.402 7.63z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><g clip-path="url(#clip0)"><path d="M4.606 8.794L1.46 5.93l-.674.74 3.916 3.564 6.12-7.293-.767-.643-5.45 6.496z"/></g><defs><clipPath id="clip0"><path d="M0 0h12v12H0z"/></clipPath></defs></svg>
      );
  }
};
export default SVG;
