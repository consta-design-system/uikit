import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = <path d="M8 1H6V6H1V8H4V11H6V6H11V4H8V1Z" />;

const SVG_S = <path d="M10 2H8V8H2V10H6V14H8V8H14V6H10V2Z" />;

const SVG_M = (
  <g>
    <path d="M15 3V9H21V11H13V3H15Z" />
    <path d="M9 21V15H3V13H11V21H9Z" />
  </g>
);

const Collapse = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Collapse;
