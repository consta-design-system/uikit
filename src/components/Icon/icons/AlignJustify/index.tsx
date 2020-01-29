import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path d="M15 3H1V5H15V3Z" />
    <path d="M1 7H15V9H1V7Z" />
    <path d="M1 11H15V13H1V11Z" />
  </g>
);

const SVG_M = <path d="M3 19H21V17H3V19ZM3 15H21V13H3V15ZM3 11H21V9H3V11ZM3 5V7H21V5H3Z" />;

const AlignJustify = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default AlignJustify;
