import React from 'react';

import { Icon } from '../../../index';

const SVG_S = <path d="M2.5 2V4H7V14H9V4H13.5V2H2.5Z" fill="black" />;

const SVG_M = <path d="M5 5V8H10.5V20H13.5V8H19V5H5Z" fill="black" />;

const Type = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Type;
