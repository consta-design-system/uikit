import React from 'react';

import { Icon } from '../../../index';

const SVG_S = <path d="M7 14H9V10H7V14ZM3 2V4H7V6H9V4H13V2H3ZM2 9H14V7H2V9Z" />;

const SVG_M = <path d="M10 19H14V16H10V19ZM5 4V7H10V10H14V7H19V4H5ZM3 14H21V12H3V14Z" />;

const Strikethrough = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Strikethrough;
