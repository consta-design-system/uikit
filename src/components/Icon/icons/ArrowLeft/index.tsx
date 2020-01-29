import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M3.29289 6.00002L7.26776 2.02515L7.97487 2.73225L4.70711 6.00002L7.97487 9.26778L7.26776 9.97489L3.29289 6.00002Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.40709 8.00002L10.7042 3.70291L9.28999 2.2887L3.57867 8.00002L9.28999 13.7113L10.7042 12.2971L6.40709 8.00002Z"
  />
);

const SVG_M = <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" />;

const ArrowLeft = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default ArrowLeft;
