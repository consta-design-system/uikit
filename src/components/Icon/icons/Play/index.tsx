import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = <path d="M9 6.5L3 10L3 3L9 6.5Z" />;

const SVG_S = <path d="M13 8L3 14L3 2L13 8Z" />;

const SVG_M = <path d="M18 12L6 19L6 5L18 12Z" />;

const Play = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Play;
