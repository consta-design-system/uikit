import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2.5 2C1.67157 2 1 2.67157 1 3.5V12.5C1 13.3284 1.67157 14 2.5 14H13.5C14.3284 14 15 13.3284 15 12.5V3.5C15 2.67157 14.3284 2 13.5 2H2.5ZM3 5.92069V12H13V5.92066L7.99998 9.42067L3 5.92069ZM12.2562 4H3.74374L7.99998 6.97936L12.2562 4Z"
  />
);

const SVG_M = (
  <path d="M20.8 3H3.2C1.99 3 1.011 4.0125 1.011 5.25L1 18.75C1 19.9875 1.99 21 3.2 21H20.8C22.01 21 23 19.9875 23 18.75V5.25C23 4.0125 22.01 3 20.8 3ZM20.8 18.75H3.2V7.5L12 13.125L20.8 7.5V18.75ZM12 10.875L3.2 5.25H20.8L12 10.875Z" />
);

const Mail = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Mail;
