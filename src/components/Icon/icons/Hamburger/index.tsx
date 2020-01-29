import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path d="M14 5H2V3H14V5Z" />
    <path d="M14 9H2V7H14V9Z" />
    <path d="M2 13H14V11H2V13Z" />
  </g>
);

const SVG_M = <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />;

const Hamburger = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Hamburger;
