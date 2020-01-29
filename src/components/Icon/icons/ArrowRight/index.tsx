import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.97487 6.00002L5 9.97489L4.29289 9.26778L7.56066 6.00002L4.29289 2.73225L5 2.02515L8.97487 6.00002Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9.59421 8.00002L5.2971 3.70291L6.71132 2.2887L12.4226 8.00002L6.71132 13.7113L5.2971 12.2971L9.59421 8.00002Z"
  />
);

const SVG_M = <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" />;

const ArrowRight = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default ArrowRight;
