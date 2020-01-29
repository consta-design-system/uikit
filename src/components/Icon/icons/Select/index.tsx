import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = <path d="M6 8.5L10 4H2L6 8.5Z" />;

const SVG_S = <path d="M3.5 5L8 10L12.5 5H3.5Z" />;

const SVG_M = <path d="M6.5 9L12 15L17.5 9H6.5Z" />;

const Select = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Select;
