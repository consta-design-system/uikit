import React from 'react';

import Icon from '../../../Icon';

const SVG_S = <path d="M9 4V9H11.75L10 12H12.25L14 9V4H9ZM2 9H4.75L3 12H5.25L7 9V4H2V9Z" />;

const SVG_M = <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z" />;

const Quote = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Quote;
