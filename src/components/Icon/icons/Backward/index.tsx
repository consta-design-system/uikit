import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path d="M2.71057 6.00003L5.35701 3.35359L4.6499 2.64648L0.796349 6.50004L4.6499 10.3536L5.35701 9.64648L2.71055 7.00003H10V6.00003H2.71057Z" />
);

const SVG_S = (
  <path d="M5.40715 7.00002L8.70425 3.70291L7.29004 2.2887L1.57872 8.00002L7.29004 13.7113L8.70425 12.2971L5.40714 9.00002H14V7.00002H5.40715Z" />
);

const SVG_M = <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />;

const Backward = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Backward;
