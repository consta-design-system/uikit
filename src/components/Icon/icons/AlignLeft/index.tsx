import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <g>
    <path d="M11 3H1V5H11V3Z" />
    <path d="M1 7H15V9H1V7Z" />
    <path d="M1 11H11V13H1V11Z" />
  </g>
);

const SVG_M = <path d="M15 17H3V19H15V17ZM15 9H3V11H15V9ZM3 15H21V13H3V15ZM3 5V7H21V5H3Z" />;

const AlignLeft = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default AlignLeft;
