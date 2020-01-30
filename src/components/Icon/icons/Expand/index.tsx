import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9.00003 3.00004H5V1H11V7H9L9.00003 3.00004ZM3.00003 9.00004V5.00004H1V11H7V9.00004H3.00003Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12 4H7.04762V2H14V8.95238H12V4ZM4 12V7.04762H2V14H8.95238V12H4Z"
  />
);

const SVG_M = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M19 5H11V3L21 3V13H19V5ZM5 19V11H3L3 21H13V19H5Z"
  />
);

const Expand = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Expand;
