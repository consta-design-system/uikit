import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = <rect x="4" y="4" width="4" height="4" rx="2" />;

const SVG_S = <rect x="6" y="6" width="4" height="4" rx="2" />;

const SVG_M = <rect x="8" y="8" width="8" height="8" rx="4" />;

const Record = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Record;
