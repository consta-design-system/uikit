import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.09463 2H8.91447L13 12H11.1802L10.1611 9.5H5.83894L4.81984 12H3L7.09463 2ZM8.00455 4.225L6.53048 7.83333H9.47862L8.00455 4.225Z"
    />
    <path d="M16 14H0V16H16V14Z" />
  </g>
);

const SVG_M = (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 17L11 3H13L18.49 17H16.24L15.12 14H8.87L7.75 17H5.5ZM12 5.67L9.62 12H14.38L12 5.67Z"
    />
    <path d="M24 24V20H0V24H24Z" />
  </g>
);

const ColorText = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default ColorText;
