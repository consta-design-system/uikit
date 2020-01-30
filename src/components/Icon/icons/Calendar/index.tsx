import React from 'react';

import Icon from '../../../Icon';

const SVG_XS = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2.5 0C2.22386 0 2 0.223858 2 0.5V2H1C0.447715 2 0 2.44772 0 3V4V10C0 10.5523 0.447715 11 1 11H11C11.5523 11 12 10.5523 12 10V4V3C12 2.44772 11.5523 2 11 2H10V0.5C10 0.223858 9.77614 0 9.5 0C9.22386 0 9 0.223858 9 0.5V2H3V0.5C3 0.223858 2.77614 0 2.5 0ZM11 4H1L1 10H11V4Z"
  />
);

const SVG_S = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5 1C4.44772 1 4 1.44772 4 2V3H2C1.44772 3 1 3.44772 1 4V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V4C15 3.44772 14.5523 3 14 3H12V2C12 1.44772 11.5523 1 11 1C10.4477 1 10 1.44772 10 2V3H6V2C6 1.44772 5.55228 1 5 1ZM3 7H13V13H3V7Z"
  />
);

const SVG_M = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7 1.5C6.44772 1.5 6 1.94772 6 2.5V4H3C1.89543 4 1 4.89543 1 6V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V6C23 4.89543 22.1046 4 21 4H18V2.5C18 1.94772 17.5523 1.5 17 1.5H16C15.4477 1.5 15 1.94772 15 2.5V4H9V2.5C9 1.94772 8.55228 1.5 8 1.5H7ZM4.14286 10.0909H19.8571V17.9091H4.14286V10.0909Z"
  />
);

const Calendar = props => {
  let svg;

  if (props.size === 'xs') svg = SVG_XS;
  else if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <Icon {...props}>{svg}</Icon>;
};

export default Calendar;
