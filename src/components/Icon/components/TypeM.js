import React from 'react';
const SVG = props => {
  switch (props.size) {
    case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24">
          <path d="M5 5v3h5.5v12h3V8H19V5H5z" />
        </svg>
      );
  }
};
export default SVG;
