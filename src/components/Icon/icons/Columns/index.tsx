import React from 'react';

import { Icon } from '../../../index';

const SVG_S = <path d="M6 14H10V2H6V14ZM1 14H5V2H1V14ZM11 2V14H15V2H11Z" />;

const SVG_M = <path d="M10 18H15V5H10V18ZM4 18H9V5H4V18ZM16 5V18H21V5H16Z" />;

const Columns = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Columns;
