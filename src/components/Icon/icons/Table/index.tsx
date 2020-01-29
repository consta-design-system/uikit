import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <path d="M2 2V14H14V2H2ZM7 12H4V9H7V12ZM7 7H4V4H7V7ZM12 12H9V9H12V12ZM12 7H9V4H12V7Z" />
);

const SVG_M = (
  <path d="M3 3V21H21V3H3ZM11 19H5V13H11V19ZM11 11H5V5H11V11ZM19 19H13V13H19V19ZM19 11H13V5H19V11Z" />
);

const Table = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Table;
