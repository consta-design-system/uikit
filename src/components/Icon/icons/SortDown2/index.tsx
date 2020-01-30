import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M11 3V4L1 4V3H11Z" />
    <path d="M9 6V7L3 7V6L9 6Z" />
    <path d="M8 10V9H4V10H8Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M2 3H14V5H2V3Z" />
    <path d="M4 7H12V9H4V7Z" />
    <path d="M10 11H6V13H10V11Z" />
  </g>
);

const SVG_M = <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" />;

const SortDown2 = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default SortDown2;
