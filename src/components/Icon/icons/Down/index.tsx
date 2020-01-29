import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path d="M4.89818 9.18756L2.25177 6.54115L1.54467 7.24826L5.39822 11.1018L9.25177 7.24826L8.54467 6.54115L5.89818 9.18764V1.89825H4.89818V9.18756Z" />
);

const SVG_S = (
  <path d="M6.78944 10.3822L3.49223 7.08503L2.07801 8.49925L7.78934 14.2106L13.5007 8.49925L12.0864 7.08503L8.78944 10.382V1.78925H6.78944V10.3822Z" />
);

const SVG_M = <path d="M11 4V16.17L5.41 10.58L4 12L12 20L20 12L18.59 10.59L13 16.17V4H11Z" />;

const Down = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Down;
