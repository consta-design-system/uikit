import React from 'react';
const SVG = props => {
  switch (props.size) {
    case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16">
          <path d="M3 2v2h4.5v10h2V4H14V2H3z" />
        </svg>
      );
  }
};
export default SVG;
