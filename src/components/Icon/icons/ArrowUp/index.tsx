import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.00513 3.65906L9.98 7.63393L9.2729 8.34104L6.00513 5.07327L2.73737 8.34104L2.03026 7.63393L6.00513 3.65906Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.00002 6.40582L3.70291 10.7029L2.2887 9.28872L8.00002 3.57739L13.7113 9.28872L12.2971 10.7029L8.00002 6.40582Z"
  />
);

const SVG_M = <path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" />;

const ArrowUp = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default ArrowUp;
