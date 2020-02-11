import React from 'react';
import File from '../../../File';

const SVG_S = (
  <React.Fragment>
    <path
      fill="#B56AFB"
      d="M19.6 0H1.4A1.4 1.4 0 000 1.4v25.2A1.4 1.4 0 001.4 28h18.2a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0019.6 0z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M15 12l-7 2v8H6.5a1.5 1.5 0 000 3H7a2 2 0 002-2v-5.25l5-1.5V20h-1.5a1.5 1.5 0 000 3h.5a2 2 0 002-2v-9zm-1 2.25l-5 1.5v1l5-1.5v-1z"
      clipRule="evenodd"
      opacity=".7"
    />
    <path
      fill="#fff"
      d="M5 4H4v3l1 2h1l.5-1L7 9h1l1-2V4H8v3H7V5H6v2H5V4zM15 4h1v3h1V4h1v3l-1 2h-1l-1-2V4z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M13.66 8.92c.107.053.203.08.29.08h.55v-.7c-.18 0-.31-.023-.39-.07A.267.267 0 0114 8V5.6c0-.56-.14-.967-.42-1.22-.273-.253-.7-.38-1.28-.38h-1.8v1h1.75c.247 0 .433.057.56.17.127.113.19.273.19.48V6h-1.54C10.487 6 10 6.517 10 7.55v.1c0 .493.113.843.34 1.05.233.2.603.3 1.11.3h1.34a.73.73 0 00.61-.3c.073.093.16.167.26.22zm-.74-1.06c-.053.093-.18.14-.38.14H11.5c-.173 0-.3-.04-.38-.12-.071-.071-.111-.18-.119-.326A.583.583 0 0111.6 7H13v.5a.72.72 0 01-.08.36z"
      clipRule="evenodd"
    />
  </React.Fragment>
);

const SVG_M = (
  <React.Fragment>
    <path fill="#B56AFB" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M20 18l-8 2v9h-1.5a1.5 1.5 0 000 3h.5a2 2 0 002-2v-6.25l6-1.5V27h-1.5a1.5 1.5 0 000 3h.5a2 2 0 002-2V18zm-1 2.25l-6 1.5v1l6-1.5v-1z"
      clipRule="evenodd"
      opacity=".7"
    />
    <path
      fill="#fff"
      d="M9 6H8v3l1 2h1l.5-1 .5 1h1l1-2V6h-1v3h-1V7h-1v2H9V6zM19 6h1v3h1V6h1v3l-1 2h-1l-1-2V6z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M17.66 10.92a.66.66 0 00.29.08h.55v-.7c-.18 0-.31-.023-.39-.07A.267.267 0 0118 10V7.6c0-.56-.14-.967-.42-1.22-.273-.253-.7-.38-1.28-.38h-1.8v1h1.75c.247 0 .433.057.56.17.127.113.19.273.19.48V8h-1.54C14.487 8 14 8.517 14 9.55v.1c0 .493.113.843.34 1.05.233.2.603.3 1.11.3h1.34a.73.73 0 00.61-.3c.073.093.16.167.26.22zm-.74-1.06c-.053.093-.18.14-.38.14H15.5c-.173 0-.3-.04-.38-.12-.071-.071-.111-.18-.119-.326A.583.583 0 0115.6 9H17v.5a.72.72 0 01-.08.36z"
      clipRule="evenodd"
    />
  </React.Fragment>
);

const Wav = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Wav;
