import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <path d="M11.13 7.82C11.96 7.24 12.5 6.38 12.5 5.5C12.5 3.57 10.93 2 9 2H3V14H9.75C11.54 14 13 12.54 13 10.75C13 9.45 12.23 8.34 11.13 7.82ZM5.5 4H8.75C9.58 4 10.25 4.67 10.25 5.5C10.25 6.33 9.58 7 8.75 7H5.5V4ZM9.25 12H5.5V9H9.25C10.08 9 10.75 9.67 10.75 10.5C10.75 11.33 10.08 12 9.25 12Z" />
);

const SVG_M = (
  <path d="M15.6 11.79C16.57 11.12 17.25 10.02 17.25 9C17.25 6.74 15.5 5 13.25 5H7V19H14.04C16.13 19 17.75 17.3 17.75 15.21C17.75 13.69 16.89 12.39 15.6 11.79ZM10 7.5H13C13.83 7.5 14.5 8.17 14.5 9C14.5 9.83 13.83 10.5 13 10.5H10V7.5ZM13.5 16.5H10V13.5H13.5C14.33 13.5 15 14.17 15 15C15 15.83 14.33 16.5 13.5 16.5Z" />
);

const Bold = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Bold;
