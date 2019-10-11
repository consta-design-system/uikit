import React from "react";
const SVG = props => {
  switch (props.size) {
   case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><path d="M11 3.5C11 5.157 9.657 7 8 7S5 5.157 5 3.5 5.5 0 8 0s3 1.843 3 3.5z"/><path d="M15 15H1c0-5 1.556-6 7-6s7 1 7 6z"/></svg>
      );
  }
};
export default SVG;
