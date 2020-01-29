import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path d="M4 3H2V5H4V3Z" />
    <path d="M14 3H5V5H14V3Z" />
    <path d="M5 7H14V9H5V7Z" />
    <path d="M14 11H5V13H14V11Z" />
    <path d="M2 7H4V9H2V7Z" />
    <path d="M4 11H2V13H4V11Z" />
  </g>
);

const SVG_M = (
  <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" />
);

const List = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default List;
