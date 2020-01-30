import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = <path d="M6 3H5V6H2V7H5V10H6V7H9V6H6V3Z" />;

const SVG_S = <path d="M9 2H7V7H2V9H7V14H9V9H14V7H9V2Z" />;

const SVG_M = <path d="M13 2H11V11H2V13H11V22H13V13H22V11H13V2Z" />;

const Add = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Add;
