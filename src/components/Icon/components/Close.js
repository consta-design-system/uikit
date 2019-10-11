import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M0 0h24v24H0z"/><path d="M4.391 2L2.316 4.08l7.9 7.914L2 20.08 3.917 22l8.215-8.086 7.684 7.698 2.075-2.08-7.665-7.68L22 4.202 20.087 2.28 12.31 9.934 4.39 2z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M3.757 2.343L2.343 3.757 6.586 8l-4.243 4.243 1.414 1.414L8 9.414l4.243 4.243 1.414-1.414L9.414 8l4.243-4.243-1.414-1.414L8 6.586 3.757 2.343z"/></svg>
      );
  case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12"><path d="M2.706 3L2 3.707l1.415 1.413 1.39 1.388L3.43 7.884 2.016 9.299l.704.704 1.413-1.415L5.509 7.21l1.366 1.364L8.29 9.987l.707-.706L7.58 7.868 6.215 6.504l1.37-1.374L9 3.715l-.703-.704-1.413 1.415L5.51 5.8 4.122 4.414 2.706 3z"/></svg>
      );
  }
};
export default SVG;
