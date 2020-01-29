import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2 1C1.44772 1 1 1.44772 1 2V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V2C11 1.44772 10.5523 1 10 1H2ZM2.5 8H9.5L7 4.5L5 7L4 6L2.5 8Z"
  />
);

const SVG_S = (
  <path d="M14 1H2C1.45 1 1 1.45 1 2V14C1 14.55 1.45 15 2 15H14C14.55 15 15 14.55 15 14V2C15 1.45 14.55 1 14 1ZM3 12L5 9L7 11L10 7L13 12H3Z" />
);

const SVG_M = (
  <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
);

const Photo = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Photo;
