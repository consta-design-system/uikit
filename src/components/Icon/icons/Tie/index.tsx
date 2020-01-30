import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7.5 0H3.5L4.6 2.2L2.5 8.5L5.5 11L8.5 8.5L6.4 2.2L7.5 0Z"
  />
);

const SVG_S = <path d="M10 0H6L7.34848 2.69697L5 13.5L8 16L11 13.5L8.65152 2.69697L10 0Z" />;

const SVG_M = <path d="M15.5 0H8.5L10.8495 4.27185L7.5 20L12 24L16.5 20L13.1505 4.27184L15.5 0Z" />;

const Tie = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Tie;
