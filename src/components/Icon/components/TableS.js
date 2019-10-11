import React from 'react';
const SVG = props => {
  switch (props.size) {
    case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16">
          <path d="M2 2v12h12V2H2zm5 10H4V9h3v3zm0-5H4V4h3v3zm5 5H9V9h3v3zm0-5H9V4h3v3z" />
        </svg>
      );
  }
};
export default SVG;
