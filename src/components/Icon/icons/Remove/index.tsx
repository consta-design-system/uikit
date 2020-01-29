import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = <rect x="2" y="6" width="7" height="1" />;

const SVG_S = <rect x="2" y="7" width="12" height="2" />;

const SVG_M = <rect x="2" y="11" width="20" height="2" />;

const Remove = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Remove;
