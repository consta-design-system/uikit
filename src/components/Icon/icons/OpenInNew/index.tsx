import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path d="M11.5857 3H8V1H15V8H13V4.41412L7.70706 9.70706L6.29285 8.29285L11.5857 3Z" />
    <path d="M1 3H7V5H3V13H11V9H13V15H1V3Z" />
  </g>
);

const OpenInNew = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm')
    // TODO
    svg = SVG_S;

  return <Icon {...props}>{svg}</Icon>;
};

export default OpenInNew;
