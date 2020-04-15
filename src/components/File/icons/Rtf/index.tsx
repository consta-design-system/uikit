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
      d="M16.35 3a.374.374 0 00-.26.09.268.268 0 00-.09.21V4h1v1h-1v3h1v1h-3V8h1V5h-1V4h1v-.9c0-.34.097-.607.29-.8.193-.2.443-.3.75-.3h1.46v1h-1.15zm-5.3 6c-.34 0-.6-.11-.78-.33-.18-.22-.27-.51-.27-.87V5H9V4h1V3h1v1h2v1h-2v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H13v1h-1.95zM5 5.01V8H4v1h3V8H6V5.62a.708.708 0 01.17-.41c.107-.14.267-.21.48-.21H8V4H6c-.313 0-.78.32-1 .5V4H4v1.01h1z"
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
      d="M15.05 12c-.34 0-.6-.11-.78-.33-.18-.22-.27-.51-.27-.87V8h-1V7h1V6h1v1h2v1h-2v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H17v1h-1.95zM20.35 6a.374.374 0 00-.26.09.268.268 0 00-.09.21V7h1v1h-1v3h1v1h-3v-1h1V8h-1V7h1v-.9c0-.34.097-.607.29-.8.193-.2.443-.3.75-.3h1.46v1h-1.15z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      d="M9 11V8.01H8V7h1v.5c.22-.18.687-.5 1-.5h2v1h-1.35c-.213 0-.373.07-.48.21a.708.708 0 00-.17.41V11h1v1H8v-1h1z"
    />
  </React.Fragment>
);

const Rtf = (props) => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Rtf;
