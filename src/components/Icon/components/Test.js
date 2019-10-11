import React from 'react';
const SVG = props => {
  switch (props.size) {
    case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24">
          <path d="M7.036 2a1 1 0 100 2v4L5.52 10.428l6.533-.802L11.036 8V4a1 1 0 100-2h-4zm5.601 8.562l-7.8.957-1.653 2.645A1.2 1.2 0 004.2 16h9.67a1.2 1.2 0 001.018-1.836l-2.252-3.602z" />
        </svg>
      );
    case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16">
          <path d="M6 1a1 1 0 100 2v4L4.482 9.428l6.534-.802L10 7V3a1 1 0 000-2H6zm5.601 8.562l-7.8.957-1.654 2.645A1.2 1.2 0 003.165 15h9.67a1.2 1.2 0 001.017-1.836l-2.251-3.602z" />
        </svg>
      );
  }
};
export default SVG;
