import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = <rect x="2" y="3" width="7" height="7" />;

const SVG_S = <rect x="3" y="3" width="10" height="10" />;

const SVG_M = <rect x="5" y="5" width="14" height="14" />;

const Stop = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Stop;
