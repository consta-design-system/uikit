import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7 1C6.44772 1 6 1.44772 6 2V3H2V4H3V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V4H14V3H10V2C10 1.44772 9.55228 1 9 1H7ZM6 6H7V12H6V6ZM10 6H9V12H10V6Z"
  />
);

const SVG_M = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5 19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H21V4H15V3C15 2.44772 14.5523 2 14 2H10C9.44772 2 9 2.44772 9 3V4H3V6H5V19ZM11 8V17H9V8H11ZM15 17V8H13V17H15Z"
  />
);

const Trash = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Trash;
