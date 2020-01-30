import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path d="M8 4.5C8.83 4.5 9.5 3.83 9.5 3C9.5 2.17 8.83 1.5 8 1.5C7.17 1.5 6.5 2.17 6.5 3C6.5 3.83 7.17 4.5 8 4.5ZM8 6.5C7.17 6.5 6.5 7.17 6.5 8C6.5 8.83 7.17 9.5 8 9.5C8.83 9.5 9.5 8.83 9.5 8C9.5 7.17 8.83 6.5 8 6.5ZM8 11.5C7.17 11.5 6.5 12.17 6.5 13C6.5 13.83 7.17 14.5 8 14.5C8.83 14.5 9.5 13.83 9.5 13C9.5 12.17 8.83 11.5 8 11.5Z" />
);

const SVG_M = (
  <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" />
);

const Kebab = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Kebab;
