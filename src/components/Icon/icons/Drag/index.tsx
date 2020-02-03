import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = <path d="M9 4L11 6L9 8V7H7V9H8L6 11L4 9H5V7H3V8L1 6L3 4V5H5V3H4L6 1L8 3H7V5H9V4Z" />;

const SVG_S = (
  <path d="M4.5 3L8 0L11.5 3H9V7H13V4.5L16 8L13 11.5V9H9V13H11.5L8 16L4.5 13H7V9H3L3 11.5L0 8L3 4.5L3 7H7V3H4.5Z" />
);

const SVG_M = (
  <path d="M6.75 4.5L12 0L17.25 4.5H13.5V10.5H19.5V6.75L24 12L19.5 17.25V13.5H13.5V19.5H17.25L12 24L6.75 19.5H10.5V13.5H4.5L4.5 17.25L0 12L4.5 6.75L4.5 10.5H10.5V4.5H6.75Z" />
);

const Drag = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Drag;
