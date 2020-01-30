import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM13 8C13 10.7614 10.7614 13 8 13C6.98092 13 6.03304 12.6951 5.24261 12.1716L12.1716 5.24261C12.6951 6.03304 13 6.98092 13 8ZM3.8284 10.7574L10.7574 3.8284C9.96696 3.30488 9.01908 3 8 3C5.23858 3 3 5.23858 3 8C3 9.01908 3.30488 9.96696 3.8284 10.7574Z"
  />
);

const SVG_M = (
  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z" />
);

const Cancel = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Cancel;
