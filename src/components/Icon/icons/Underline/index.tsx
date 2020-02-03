import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path d="M8.5 12C11.26 12 13 9.76 13 7V1H11V7.5C11 8.88 9.88 10 8.5 10C7.12 10 6 8.88 6 7.5V1H4V7C4 9.76 5.74 12 8.5 12ZM3 13V15H14V13H3Z" />
);

const SVG_M = (
  <path d="M12 17C15.31 17 18 14.31 18 11V3H15.5V11C15.5 12.93 13.93 14.5 12 14.5C10.07 14.5 8.5 12.93 8.5 11V3H6V11C6 14.31 8.69 17 12 17ZM5 19V21H19V19H5Z" />
);

const Underline = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Underline;
