import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path d="M2.16417 9.15597L2.84983 9.84982L5.9999 6.69986L9.14917 9.84923L9.14997 9.85002L9.84977 9.1501L6.69981 5.99997L9.84997 2.84993L9.14286 2.14282L6.00054 5.30066L2.8507 2.15065L2.15002 2.84986L5.30236 6.00229L2.16417 9.15597Z" />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M3.75735 2.34314L2.34314 3.75735L6.58578 7.99999L2.34314 12.2426L3.75735 13.6568L7.99999 9.41421L12.2426 13.6568L13.6568 12.2426L9.41421 7.99999L13.6568 3.75735L12.2426 2.34314L7.99999 6.58578L3.75735 2.34314Z"
  />
);

const SVG_M = (
  <path d="M12 13.4142L19.7782 21.1924L21.1924 19.7782L13.4142 12L21.1924 4.22183L19.7782 2.80762L12 10.5858L4.22183 2.80762L2.80762 4.22183L10.5858 12L2.80762 19.7782L4.22183 21.1924L12 13.4142Z" />
);

const Close = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Close;
