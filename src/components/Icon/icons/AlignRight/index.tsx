import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <g>
    <path d="M15 3H5V5H15V3Z" />
    <path d="M1 7H15V9H1V7Z" />
    <path d="M5 11H15V13H5V11Z" />
  </g>
);

const SVG_M = <path d="M9 19H21V17H9V19ZM3 15H21V13H3V15ZM9 11H21V9H9V11ZM3 5V7H21V5H3Z" />;

const AlignRight = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default AlignRight;
