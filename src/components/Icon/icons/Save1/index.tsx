import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M3 2.5006C3.00001 1.67063 3.67432 1 4.5012 1L11.4988 1C12.3257 1 13 1.67064 13 2.5006L13 14.741L8 11.8244L3 14.741L3 2.5006ZM5 3L5 11.259L8 9.50896L11 11.259L11 3L5 3Z"
  />
);

const SVG_M = (
  <path d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z" />
);

const Save1 = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Save1;
