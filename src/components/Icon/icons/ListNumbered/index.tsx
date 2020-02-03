import React from 'react';

import Icon from '../../../Icon';

const SVG_S = (
  <path d="M1 12H3V12.5H2V13.5H3V14H1V15H4V11H1V12ZM1 7H2.8L1 9.1V10H4V9H2.2L4 6.9V6H1V7ZM2 5H3V1H1V2H2V5ZM6 2V4H15V2H6ZM6 14H15V12H6V14ZM6 9H15V7H6V9Z" />
);

const SVG_M = (
  <path d="M2 17H4V17.5H3V18.5H4V19H2V20H5V16H2V17ZM3 8H4V4H2V5H3V8ZM2 11H3.8L2 13.1V14H5V13H3.2L5 10.9V10H2V11ZM7 5V7H21V5H7ZM7 19H21V17H7V19ZM7 13H21V11H7V13Z" />
);

const ListNumbered = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default ListNumbered;
