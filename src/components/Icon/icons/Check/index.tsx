import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.60581 8.7938L1.46056 5.93035L0.787354 6.6698L4.70255 10.2342L10.8223 2.94101L10.0562 2.29822L4.60581 8.7938Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.79879 10.4172L3.1239 7.07926L1.77917 8.5597L6.99382 13.2963L14.733 4.07305L13.2009 2.78748L6.79879 10.4172Z"
  />
);

const SVG_M = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M10.1812 16.2554L3.28667 10.4702L2 12.0036L10.4265 19.0743L21.9967 5.28545L20.4647 4L10.1812 16.2554Z"
  />
);

const Check = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Check;
