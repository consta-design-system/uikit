import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.00512 8.34106L2.03025 4.36619L2.73736 3.65908L6.00512 6.92685L9.27289 3.65909L9.98 4.36619L6.00512 8.34106Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.00002 9.59295L3.70291 5.29584L2.2887 6.71005L8.00002 12.4214L13.7113 6.71005L12.2971 5.29584L8.00002 9.59295Z"
  />
);

const SVG_M = <path d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z" />;

export const ArrowDown = (props) => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default ArrowDown;
