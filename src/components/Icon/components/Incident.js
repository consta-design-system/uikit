import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><g clip-path="url(#clip0)"><path d="M12 0l1.913 8.027L24 3l-6.75 8.019 5.25 1.731-6 2.25 1.5 9-6-7.59-4.3 3.84V15L0 14.25l6.75-3.231-3-5.769 6 1.5L12 0z"/></g><defs><clipPath id="clip0"><path d="M0 0h24v24H0z"/></clipPath></defs></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M8 0l1.276 5.351L16 2l-4.5 5.346L15 8.5 11 10l1 6-4-5.06-2.866 2.56V10L0 9.5l4.5-2.154-2-3.846 4 1L8 0z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  }
};
export default SVG;
