import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M0.920111 2.57986L2.42011 1.07986L5.42011 3.87986L3.92011 5.37986L0.920111 2.57986Z" />
    <path d="M11 5V1H6.99997L8.23499 2.3L6.03856 4.35L4.48499 5.8L0.734991 9.3L2.23499 10.8L6.03856 7.25L7.59213 5.8L9.73499 3.8L11 5Z" />
    <path d="M11 11V7L9.8325 8.2437L7.99997 6.5L6.5207 8.01934L8.3325 9.7437L6.99997 11H11Z" />
  </g>
);

const SVG_S = (
  <path d="M7.29 5.87L3.41 2L2 3.41L5.87 7.28L7.29 5.87ZM9.5 2L11.04 3.54L2 12.59L3.41 14L12.46 4.96L14 6.5V2H9.5ZM10.13 8.71L8.72 10.12L11.05 12.45L9.5 14H14V9.5L12.46 11.04L10.13 8.71Z" />
);

const SVG_M = (
  <path d="M10.59 9.17L5.41 4L4 5.41L9.17 10.58L10.59 9.17ZM14.5 4L16.54 6.04L4 18.59L5.41 20L17.96 7.46L20 9.5V4H14.5ZM14.83 13.41L13.42 14.82L16.55 17.95L14.5 20H20V14.5L17.96 16.54L14.83 13.41Z" />
);

const Shuffle = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Shuffle;
