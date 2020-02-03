import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <g>
    <path d="M6 3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V13C10 13.5523 9.55228 14 9 14H7C6.44772 14 6 13.5523 6 13V9H0V7H6V3Z" />
    <path d="M16 7H12V9H16V7Z" />
  </g>
);

const SVG_M = (
  <g>
    <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V20C15 20.5523 14.5523 21 14 21H10C9.44772 21 9 20.5523 9 20V14H0V10H9V4Z" />
    <path d="M24 10H19V14H24V10Z" />
  </g>
);

const Barrier = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Barrier;
