import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <g>
    <path d="M1 1C0.447715 1 0 1.44772 0 2V8C0 8.55228 0.447715 9 1 9H2V8H1V2H7V3H8V2C8 1.44772 7.55228 1 7 1H1Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5C3 4.44772 3.44772 4 4 4H10C10.5523 4 11 4.44772 11 5V11C11 11.5523 10.5523 12 10 12H4C3.44772 12 3 11.5523 3 11V5ZM4 5H10V11H4V5Z"
    />
  </g>
);

const SVG_S = (
  <g>
    <path d="M1 0C0.447715 0 0 0.447715 0 1V10C0 10.5523 0.447715 11 1 11H4V9H2V2H9V4H11V1C11 0.447715 10.5523 0 10 0H1Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 6C5 5.44771 5.44772 5 6 5H15C15.5523 5 16 5.44772 16 6V15C16 15.5523 15.5523 16 15 16H6C5.44771 16 5 15.5523 5 15V6ZM7 7H14V14H7V7Z"
    />
  </g>
);

const SVG_M = (
  <g>
    <path d="M4 4V14H6V16H3C2.44772 16 2 15.5523 2 15V3C2 2.44772 2.44772 2 3 2H15C15.5523 2 16 2.44772 16 3V6H14V4H4Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 9C8 8.44772 8.44772 8 9 8H21C21.5523 8 22 8.44772 22 9V21C22 21.5523 21.5523 22 21 22H9C8.44772 22 8 21.5523 8 21V9ZM10 20V10H20V20H10Z"
    />
  </g>
);

export const IconCopy = (props) => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default IconCopy;
