import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path d="M13 3H3V5H13V3Z" />
    <path d="M1 7H15V9H1V7Z" />
    <path d="M3 11H13V13H3V11Z" />
  </g>
);

const SVG_M = <path d="M7 17V19H17V17H7ZM3 15H21V13H3V15ZM7 9V11H17V9H7ZM3 5V7H21V5H3Z" />;

const AlignCenter = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default AlignCenter;
