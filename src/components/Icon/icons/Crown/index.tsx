import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <rect x="2.00012" y="10.0067" width="8" height="1" />
    <path d="M10 9H2L1 4L4 5L6 1L8 5L11 4L10 9Z" />
  </g>
);

const SVG_S = (
  <g>
    <rect x="2" y="13" width="12" height="2" />
    <path d="M14 11H2L1 4L5 7L8 1L11 7L15 4L14 11Z" />
  </g>
);

const SVG_M = (
  <g>
    <rect x="4" y="18" width="16" height="3" />
    <path d="M20 16H4L2 7L8 10L12 3L16 10L22 7L20 16Z" />
  </g>
);

const Crown = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Crown;
