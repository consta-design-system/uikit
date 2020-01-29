import React from 'react';

import { Icon } from '../../../index';

const SVG_S = (
  <g>
    <path d="M8.72762 4.41211H7.77128V7.5H8.7159C9.72371 7.5 10.4 6.96758 10.4 5.95C10.4 4.93242 9.72371 4.41211 8.72762 4.41211Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM12.2 5.9C12.2 7.9 10.6934 8.9 9 8.9H7.77128V10H11V11H7.77128V13H6V11H4.5V10H6V8.9H4.5V7.5H6V3H9C10.6582 3 12.2 3.9 12.2 5.9Z"
    />
  </g>
);

const SVG_M = (
  <g>
    <path d="M13.0395 6.87444H11.6733V11.2857H13.0227C14.4624 11.2857 15.4286 10.5251 15.4286 9.07143C15.4286 7.61775 14.4624 6.87444 13.0395 6.87444Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM18 9C18 11.8571 15.8477 13.2857 13.4286 13.2857H11.6733V14.8571H16.2857V16.2857H11.6733V19.1429H9.14286V16.2857H7V14.8571H9.14286V13.2857H7V11.2857H9.14286V4.85714H13.4286C15.7974 4.85714 18 6.14286 18 9Z"
    />
  </g>
);

const Rouble = props => {
  let svg;

  if (props.size === 'xs')
    // TODO
    svg = SVG_S;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Rouble;
