import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <g>
    <path d="M4 1H5V4H4V3H1V2H4V1Z" />
    <path d="M1 7V6H7V5H8V8H7V7H1Z" />
    <path d="M4 10H11V11H4V10Z" />
    <path d="M11 6H9V7H11V6Z" />
    <path d="M1 10H2V9H3V12H2V11H1V10Z" />
    <path d="M6 2H11V3H6V2Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M6 1H5V2H1V4H5V5H6V1Z" />
    <path d="M7 2H15V4H7V2Z" />
    <path d="M1 7H10V6H11V10H10V9H1V7Z" />
    <path d="M6 12H15V14H6V12Z" />
    <path d="M4 12H1V14H4V15H5V11H4V12Z" />
    <path d="M15 7H12V9H15V7Z" />
  </g>
);

const SVG_M = (
  <g>
    <path d="M15 3H13V5H2V7H13V8H15V3Z" />
    <path d="M17 5H22V7H17V5Z" />
    <path d="M6 14V13H2V11H6V9H8V14H6Z" />
    <path d="M20 17H2V19H20V20H22V15H20V17Z" />
    <path d="M22 11H10V13H22V11Z" />
  </g>
);

const Filter = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Filter;
