import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5 5H4C3.44772 5 3 5.44772 3 6V12C3 12.5523 3.44772 13 4 13H12C12.5523 13 13 12.5523 13 12V6C13 5.44772 12.5523 5 12 5H11V4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4V5ZM6 5H10V4C10 2.89543 9.10457 2 8 2C6.89543 2 6 2.89543 6 4V5ZM6.5 9C6.5 8.17157 7.17157 7.5 8 7.5C8.82843 7.5 9.5 8.17157 9.5 9C9.5 9.82843 8.82843 10.5 8 10.5C7.17157 10.5 6.5 9.82843 6.5 9Z"
  />
);

const SVG_M = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M17 8H19C20.1 8 21 8.9 21 10V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V10C3 8.9 3.9 8 5 8H7V6C7 3.24 9.24 1 12 1C14.76 1 17 3.24 17 6V8ZM8.9 6V8H15.1V6C15.1 4.29 13.71 2.9 12 2.9C10.29 2.9 8.9 4.29 8.9 6ZM12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18Z"
  />
);

const Lock = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Lock;
