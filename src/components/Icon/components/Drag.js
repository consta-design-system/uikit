import React from "react";
const SVG = props => {
  switch (props.size) {
   case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24"><path d="M6.75 4.5L12 0l5.25 4.5H13.5v6h6V6.75L24 12l-4.5 5.25V13.5h-6v6h3.75L12 24l-5.25-4.5h3.75v-6h-6v3.75L0 12l4.5-5.25v3.75h6v-6H6.75z"/></svg>
      );
  case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16"><g clip-path="url(#clip0)"><path d="M2 9V7h12v2z"/><path d="M7 2h2v12H7zM13 4.5L16 8l-3 3.5v-7z"/><path d="M11.5 13L8 16l-3.5-3h7zM4.5 3L8 0l3.5 3h-7zM3 11.5L0 8l3-3.5v7z"/></g><defs><clipPath id="clip0"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
      );
  }
};
export default SVG;
