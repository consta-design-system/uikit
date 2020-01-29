import React from 'react';

import { Icon } from '../../../index';

const SVG_XS = (
  <g>
    <path d="M8.78574 5.21426L10 4L8 2L6.78574 3.21426L8.78574 5.21426Z" />
    <path d="M8.21426 5.78574L6.21426 3.78574L2 8V10H4L8.21426 5.78574Z" />
  </g>
);

const SVG_S = (
  <g>
    <path d="M14 5L11 2L9.58578 3.41422L12.5858 6.41422L14 5Z" />
    <path d="M11.8787 7.12132L8.87868 4.12132L2 11V14H5L11.8787 7.12132Z" />
  </g>
);

const Edit = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm')
    // TODO
    svg = SVG_S;

  return <Icon {...props}>{svg}</Icon>;
};

export default Edit;
