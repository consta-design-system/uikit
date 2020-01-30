import React from 'react';

import Icon from '../../../Icon';

const SVG_S = <path d="M6 2V4H8.58L4.92 12H2V14H10V12H7.42L11.08 4H14V2H6Z" />;

const SVG_M = <path d="M10 5V8H12.21L8.79 16H6V19H14V16H11.79L15.21 8H18V5H10Z" />;

const Ilatic = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Ilatic;
