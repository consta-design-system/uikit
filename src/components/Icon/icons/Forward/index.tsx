import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path d="M8.29286 7.00003H1V6.00003H8.29285L5.64641 3.35359L6.35352 2.64648L10.2071 6.50004L6.35352 10.3536L5.64641 9.64648L8.29286 7.00003Z" />
);

const SVG_S = (
  <path d="M10.5942 7.00002L7.29709 3.70291L8.7113 2.2887L14.4226 8.00002L8.7113 13.7113L7.29709 12.2971L10.5942 9.00002H2V7.00002H10.5942Z" />
);

const SVG_M = <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />;

const Forward = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Forward;
