import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M11 3V4L1 4V3H11Z" />
    <path d="M8 6V7L1 7V6L8 6Z" />
    <path d="M5 10V9H1V10H5Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M2 3H14V5H2V3Z" />
    <path d="M2 7H10V9H2V7Z" />
    <path d="M6 11H2V13H6V11Z" />
  </g>
);

const SVG_M = <path d="M3 18H9V16H3V18ZM3 6V8H21V6H3ZM3 13H15V11H3V13Z" />;

const SortDown = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default SortDown;
