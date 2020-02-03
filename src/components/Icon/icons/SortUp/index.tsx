import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M5 3V4L1 4V3H5Z" />
    <path d="M8 7V6L1 6V7L8 7Z" />
    <path d="M11 10V9L1 9V10L11 10Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M6 5H2V3H6V5Z" />
    <path d="M2 7V9H10V7H2Z" />
    <path d="M2 13H14V11H2V13Z" />
  </g>
);

const SVG_M = <path d="M3 8H9V6H3V8ZM3 16V18H21V16H3ZM3 13H15V11H3V13Z" />;

const SortUp = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default SortUp;
