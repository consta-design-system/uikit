import React from 'react';
import File from '../../../File';

const SVG_S = (
  <React.Fragment>
    <path
      fill="#75ADEA"
      d="M19.6 0H1.4A1.4 1.4 0 000 1.4v25.2A1.4 1.4 0 001.4 28h18.2a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0019.6 0z"
    />
    <path
      fill="#fff"
      d="M3.5 13h14a.5.5 0 010 1h-14a.5.5 0 010-1zm0 3h9a.5.5 0 010 1h-9a.5.5 0 010-1zm0 3h11a.5.5 0 010 1h-11a.5.5 0 010-1zm0 3h7a.5.5 0 010 1h-7a.5.5 0 010-1z"
      opacity=".5"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M6.05 9c-.34 0-.6-.11-.78-.33C5.09 8.45 5 8.16 5 7.8V5H4V4h1V3h1v1h1v1H6v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H7v1h-.95zM9 9H8V7h1V6H8V4h1v1.5l1 .5 1-.5V4h1v2h-1v1h1v2h-1V7.5L10 7l-1 .5V9zm5.27-.33c.18.22.44.33.78.33H16V8h-.55c-.153 0-.267-.03-.34-.09-.073-.06-.11-.163-.11-.31V5h1V4h-1V3h-1v1h-1v1h1v2.8c0 .36.09.65.27.87z"
      clipRule="evenodd"
    />
  </React.Fragment>
);

const SVG_M = (
  <React.Fragment>
    <path fill="#75ADEA" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
    <path
      fill="#fff"
      d="M7.5 19h15a.5.5 0 010 1h-15a.5.5 0 010-1zm0 3h9a.5.5 0 010 1h-9a.5.5 0 010-1zm0 3h11a.5.5 0 010 1h-11a.5.5 0 010-1zm0 6h13a.5.5 0 010 1h-13a.5.5 0 010-1zm0-3h7a.5.5 0 010 1h-7a.5.5 0 010-1z"
      opacity=".5"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.05 12c-.34 0-.6-.11-.78-.33-.18-.22-.27-.51-.27-.87V8H9V7h1V6h1v1h1v1h-1v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H12v1h-.95zM14 12h-1v-2h1V9h-1V7h1v1.5l1 .5 1-.5V7h1v2h-1v1h1v2h-1v-1.5l-1-.5-1 .5V12zm5.27-.33c.18.22.44.33.78.33H21v-1h-.55c-.153 0-.267-.03-.34-.09-.073-.06-.11-.163-.11-.31V8h1V7h-1V6h-1v1h-1v1h1v2.8c0 .36.09.65.27.87z"
      clipRule="evenodd"
    />
  </React.Fragment>
);

const Txt = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Txt;
