import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path d="M14 11C14 11.5523 13.5534 12 13.0012 12C10.835 12 5.77104 12 4.16667 12L2 14C2 12.2129 2 6.35421 2 3.99625C2 3.44397 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4V11Z" />
);

const SVG_M = (
  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
);

const Comment = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Comment;
