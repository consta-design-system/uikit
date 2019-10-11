import React from "react";
const SVG = props => {
  switch (props.size) {
   case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M7.14 1.493a1 1 0 011.723 0l6.999 11.886A1 1 0 0115 14.886H1.002A1 1 0 01.14 13.38l7-11.886zM9.1 13c0 .552-.492 1-1.1 1-.608 0-1.1-.448-1.1-1s.492-1 1.1-1c.608 0 1.1.448 1.1 1zM8 4a1 1 0 00-1 1v5a1 1 0 102 0V5a1 1 0 00-1-1z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M5.149 1.38a1 1 0 011.702 0l4.99 8.095A1 1 0 0110.99 11H1.01A1 1 0 01.16 9.475l4.99-8.094zM6.5 9a.5.5 0 11-1 0 .5.5 0 011 0zM6 3.5a.5.5 0 00-.5.5v3a.5.5 0 001 0V4a.5.5 0 00-.5-.5z"/></svg>
      );
  }
};
export default SVG;
