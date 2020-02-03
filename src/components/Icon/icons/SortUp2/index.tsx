import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M8 3V4L4 4V3H8Z" />
    <path d="M9 7V6L3 6V7L9 7Z" />
    <path d="M11 10V9L1 9V10L11 10Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M10 5H6V3H10V5Z" />
    <path d="M4 7V9H12V7H4Z" />
    <path d="M2 13H14V11H2V13Z" />
  </g>
);

const SVG_M = <path d="M14 6L10 6V8L14 8L14 6ZM21 18V16L3 16V18L21 18ZM18 11L6 11V13L18 13V11Z" />;

const SortUp2 = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default SortUp2;
