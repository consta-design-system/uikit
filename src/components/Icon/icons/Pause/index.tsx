import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M5 3H2V10H5V3Z" />
    <path d="M9 3H6V10H9V3Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M7 2H3V14H7V2Z" />
    <path d="M13 2H9.00002V14H13V2Z" />
  </g>
);

const SVG_M = (
  <g>
    <path d="M10 4H5V20H10V4Z" />
    <path d="M19 4H14V20H19V4Z" />
  </g>
);

const Pause = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Pause;
