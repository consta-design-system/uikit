import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5.5 11L11 3L8 0H3L0 3L4.71429 9.85714L3 3H5.5V11Z"
  />
);

const SVG_S = (
  <path d="M13 6H10L11.6 2H4L0 5.9L7.26606 14.1651L4 6H8V15L16 5.9L12.2484 2.24224L13 6Z" />
);

const SVG_M = (
  <path d="M18.75 2.75L21 8H15L17.5714 2H6L0 8L10.7368 21.4211L6 8H12V23L24 8L18.75 2.75Z" />
);

const Diamond = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Diamond;
