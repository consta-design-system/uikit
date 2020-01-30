import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <g>
    <path d="M0 8C0 5.79086 1.79086 4 4 4H7V6H4C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10H7V12H4C1.79086 12 0 10.2091 0 8Z" />
    <path d="M9 6V4H12C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12H9V10H12C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6H9Z" />
    <path d="M11 7H5V9H11V7Z" />
  </g>
);

const SVG_M = (
  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" />
);

const Link = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Link;
