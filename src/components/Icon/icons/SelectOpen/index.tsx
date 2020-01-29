import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = <path d="M6 3.5L10 8H2L6 3.5Z" />;

const SVG_S = <path d="M8 5L3.5 10H12.5L8 5Z" />;

const SVG_M = <path d="M6.5 15L12 9L17.5 15H6.5Z" />;

const SelectOpen = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default SelectOpen;
