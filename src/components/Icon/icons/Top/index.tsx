import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path d="M6.10351 3.81066V11.1036H5.10351V3.81074L2.4571 6.45714L1.75 5.75004L5.60355 1.89648L9.4571 5.75004L8.75 6.45714L6.10351 3.81066Z" />
);

const SVG_S = (
  <path d="M7.21142 5.6169L3.91421 8.91411L2.5 7.4999L8.21132 1.78857L13.9226 7.4999L12.5084 8.91411L9.21142 5.6171V14.2112H7.21142V5.6169Z" />
);

const SVG_M = <path d="M4 12L5.41 13.41L11 7.83V20H13V7.83L18.59 13.41L20 12L12 4L4 12Z" />;

const Top = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Top;
