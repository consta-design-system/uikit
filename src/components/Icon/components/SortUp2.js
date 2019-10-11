import React from 'react';
const SVG = props => {
  switch (props.size) {
    case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24">
          <path d="M14 6h-4v2h4V6zm7 12v-2H3v2h18zm-3-7H6v2h12v-2z" />
        </svg>
      );
    case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16">
          <path d="M10 5H6V3h4v2zM4 7v2h8V7H4zm-2 6h12v-2H2v2z" />
        </svg>
      );
    case 'xs':
      return (
        <svg fill={`${currentColor}`} width="12" height="12">
          <path d="M8 3v1H4V3h4zm1 4V6H3v1h6zm2 3V9H1v1h10z" />
        </svg>
      );
  }
};
export default SVG;
