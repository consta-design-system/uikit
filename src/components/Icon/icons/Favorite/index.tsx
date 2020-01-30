import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path d="M8 11.4479L12.326 14L11.178 9.19L15 5.95368L9.967 5.53632L8 1L6.033 5.53632L1 5.95368L4.822 9.19L3.674 14L8 11.4479Z" />
);

const SVG_M = (
  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
);

const Favorite = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Favorite;
