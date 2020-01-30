import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5.5 5C6.88071 5 8 3.88071 8 2.5C8 1.11929 6.88071 0 5.5 0C4.11929 0 3 1.11929 3 2.5C3 3.88071 4.11929 5 5.5 5ZM5.5 6.5C9 6.5 10 8.26619 10 11H1C1 8.26619 2 6.5 5.5 6.5Z"
  />
);

const SVG_S = (
  <g>
    <path d="M8 7C9.65685 7 11 5.15685 11 3.5C11 1.84315 10.5 0 8 0C5.5 0 5 1.84315 5 3.5C5 5.15685 6.34315 7 8 7Z" />
    <path d="M8 9C2.55556 9 1 10 1 15L15 15C15 10 13.4444 9 8 9Z" />
  </g>
);

const SVG_M = (
  <g>
    <path d="M11 12C13.7614 12 15.5 9.10363 15.5 6.5C15.5 3.89637 15.1667 1 11 1C6.83333 1 6.5 3.89637 6.5 6.5C6.5 9.10363 8.23858 12 11 12Z" />
    <path d="M10 14C4.5 14 2 16.0532 2 22L20 22C20 15.3333 16.5 14 12 14H10Z" />
  </g>
);

const User = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default User;
